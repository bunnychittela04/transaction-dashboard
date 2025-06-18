const axios = require('axios');
const Transaction = require('../models/Transaction');

// Initialize the database with seed data
exports.initializeDatabase = async (req, res) => {
    try {
        // Fetch data from the third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactionsData = response.data;

        // Clear the existing data in the collection
        await Transaction.deleteMany({});

        // Insert the fetched data into the database
        const transactions = await Transaction.insertMany(transactionsData);

        res.status(200).json({
            message: 'Database initialized successfully.',
            data: transactions // Optionally return the inserted data
        });
    } catch (error) {
        console.error('Error initializing the database:', error);
        res.status(500).json({ message: 'Error initializing the database', error });
    }
};

// List transactions with search and pagination
exports.getTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '' } = req.query;
    const regex = new RegExp(search, 'i'); // Case-insensitive search

    // Pagination settings
    const limit = parseInt(perPage);
    const skip = (parseInt(page) - 1) * limit;

    try {
        // Construct the search query
        const query = search
            ? {
                $or: [
                    { title: regex },
                    { description: regex },
                    // Only include the price condition if search can be parsed as a number
                    !isNaN(search) ? { price: parseFloat(search) } : null
                ].filter(Boolean) // Filter out null if price search is not valid
            }
            : {}; // Empty query if no search term provided

        // Fetch transactions with pagination
        const transactions = await Transaction.find(query)
            .skip(skip)
            .limit(limit);

        // Get total count for pagination information
        const totalRecords = await Transaction.countDocuments(query);

        res.status(200).json({
            page: parseInt(page),
            perPage: limit,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            data: transactions
        });
    } catch (error) {
        console.error('Error fetching transactions:', error); // Log error for debugging
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};


// Statistics API
exports.getStatistics = async (req, res) => {
    const { month } = req.query;
    const monthInt = new Date(`${month} 1, 2000`).getMonth() + 1; // Convert month name to 1-based index

    try {
        // Aggregate statistics for the selected month
        const stats = await Transaction.aggregate([
            {
                $addFields: {
                    // Extract the month from the dateOfSale field
                    monthOfSale: { $month: '$dateOfSale' }
                }
            },
            {
                $match: {
                    monthOfSale: monthInt // Match transactions based on the month only
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$dateOfSale" } }, // Group by month
                    totalSaleAmount: { $sum: '$price' }, // Sum of prices for total sale amount
                    totalSoldItems: { $sum: { $cond: ['$sold', 1, 0] } }, // Count of sold items
                    totalNotSoldItems: { $sum: { $cond: ['$sold', 0, 1] } } // Count of not sold items
                }
            }
        ]);

        // If no transactions were found for the selected month, return zero values
        const result = stats[0] || { 
            _id: { month: monthInt }, // Provide the month number for clarity
            totalSaleAmount: 0, 
            totalSoldItems: 0, 
            totalNotSoldItems: 0 
        };

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
};


// Bar Chart API
exports.getBarChart = async (req, res) => {
    const { month } = req.query;
    const monthInt = new Date(`${month} 1, 2000`).getMonth() + 1; // Convert month name to 1-based index

    try {
        // Aggregate data for the selected month
        const barChartData = await Transaction.aggregate([
            {
                $addFields: {
                    // Extract the month from the dateOfSale field
                    monthOfSale: { $month: '$dateOfSale' }
                }
            },
            {
                $match: {
                    monthOfSale: monthInt // Match transactions based on the month
                }
            },
            {
                $bucket: {
                    groupBy: "$price", // Field to group by (price)
                    boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901], // Boundaries for the price ranges
                    default: "901+", // Bucket for values above 900
                    output: {
                        count: { $sum: 1 } // Count the number of documents in each bucket
                    }
                }
            },
            {
                $addFields: {
                    rangeLabel: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$_id", 0] }, then: "0 - 100" },
                                { case: { $eq: ["$_id", 101] }, then: "101 - 200" },
                                { case: { $eq: ["$_id", 201] }, then: "201 - 300" },
                                { case: { $eq: ["$_id", 301] }, then: "301 - 400" },
                                { case: { $eq: ["$_id", 401] }, then: "401 - 500" },
                                { case: { $eq: ["$_id", 501] }, then: "501 - 600" },
                                { case: { $eq: ["$_id", 601] }, then: "601 - 700" },
                                { case: { $eq: ["$_id", 701] }, then: "701 - 800" },
                                { case: { $eq: ["$_id", 801] }, then: "801 - 900" }
                            ],
                            default: "901+"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0, // Remove the default _id
                    range: "$rangeLabel", // Use the human-readable range labels
                    count: 1 // Include the count field
                }
            }
        ]);

        // Ensure the output is formatted correctly with "range" first and "count" second
        const formattedData = barChartData.map(item => ({
            range: item.range,
            count: item.count
        }));

        // Return the formatted response
        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ message: 'Error fetching bar chart data', error });
    }
};



// Pie Chart API
exports.getPieChart = async (req, res) => {
    const { month } = req.query;
    const monthInt = new Date(`${month} 1, 2000`).getMonth() + 1; // Convert month name to 1-based index

    try {
        // Aggregate data for the selected month
        const pieChartData = await Transaction.aggregate([
            {
                $addFields: {
                    // Extract the month from the dateOfSale field
                    monthOfSale: { $month: '$dateOfSale' }
                }
            },
            {
                $match: {
                    monthOfSale: monthInt // Match transactions based on the month
                }
            },
            {
                $group: {
                    _id: "$category", // Group by category
                    count: { $sum: 1 } // Count the number of items in each category
                }
            }
        ]);

        // Return the response
        res.status(200).json(pieChartData);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ message: 'Error fetching pie chart data', error });
    }
};

// Combined API to fetch data from transactions, statistics, and pie chart
exports.getCombinedData = async (req, res) => {
    const { month } = req.query; // Get the month from the request query

    try {
        // Fetch transactions
        const transactionsResponse = await axios.get(`http://localhost:5000/api/transactions?month=${month}`);
        const transactions = transactionsResponse.data;

        // Fetch statistics
        const statisticsResponse = await axios.get(`http://localhost:5000/api/statistics?month=${month}`);
        const statistics = statisticsResponse.data;

        // Fetch pie chart data
        const pieChartResponse = await axios.get(`http://localhost:5000/api/piechart?month=${month}`);
        const pieChartData = pieChartResponse.data;

        // Combine the responses into a single object
        const combinedData = {
            transactions,
            statistics,
            pieChartData
        };

        // Return the combined response
        res.status(200).json(combinedData);
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ message: 'Error fetching combined data', error });
    }
};
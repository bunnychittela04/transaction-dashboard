import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Statistics = ({ month }) => {
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
    });

    useEffect(() => {
        fetchStatistics();
    }, [month]);

    const fetchStatistics = async () => {
        try {
            const response = await axios.get(`/api/statistics?month=${month}`);
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
            <h2 className="text-xl font-bold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Total Sale Amount</h3>
                    <p className="text-2xl font-bold text-green-600">${statistics.totalSaleAmount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Total Sold Items</h3>
                    <p className="text-2xl font-bold text-blue-600">{statistics.totalSoldItems}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Total Not Sold Items</h3>
                    <p className="text-2xl font-bold text-red-600">{statistics.totalNotSoldItems}</p>
                </div>
            </div>
        </div>
    );
};

// PropTypes validation
Statistics.propTypes = {
    month: PropTypes.string.isRequired,
};

export default Statistics;

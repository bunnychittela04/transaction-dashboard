import { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionTable = ({ month }) => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, [month, page, search]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`/api/transactions?month=${month}&page=${page}&search=${search}`);
            setTransactions(response.data.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search Transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 mb-2"
            />
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td className="border p-2">{transaction.title}</td>
                            <td className="border p-2">{transaction.description}</td>
                            <td className="border p-2">{transaction.price}</td>
                            <td className="border p-2">{transaction.category}</td>
                            <td className="border p-2">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Previous
                </button>
                <button onClick={() => setPage(page + 1)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionTable;

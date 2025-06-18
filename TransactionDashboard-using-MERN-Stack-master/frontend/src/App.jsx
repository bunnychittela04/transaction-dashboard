import { useState } from 'react';
import TransactionTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';

const App = () => {
    const [month, setMonth] = useState('March');

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    return (
        <div className="flex flex-col lg:flex-row lg:h-screen lg:p-4">
            {/* Left Half: Transactions Table */}
            <div className="flex-1 bg-gray-50 p-4 overflow-auto">
                <h1 className="text-2xl font-bold mb-4">Transactions Dashboard</h1>
                <TransactionTable month={month} />
            </div>
            
            {/* Right Half: Statistics and Bar Chart */}
            <div className="flex-1 bg-white p-4 lg:ml-4 lg:shadow-lg lg:rounded-md">
                <div className="mb-4">
                    <label className="block mb-2">Select Month</label>
                    <select onChange={handleMonthChange} value={month} className="p-2 border border-gray-300 rounded">
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                <Statistics month={month} />
                <BarChart month={month} />
            </div>
        </div>
    );
};

export default App;

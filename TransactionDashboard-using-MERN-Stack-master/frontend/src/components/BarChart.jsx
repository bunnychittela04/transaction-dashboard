import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ month }) => {
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        fetchBarData();
    }, [month]);

    const fetchBarData = async () => {
        try {
            const response = await axios.get(`/api/barchart?month=${month}`);
            setBarData(response.data);
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        }
    };

    const data = {
        labels: barData.map(item => item.range),
        datasets: [
            {
                label: 'Number of Items',
                data: barData.map(item => item.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Items by Price Range',
            },
        },
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Bar Chart - Items by Price Range</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;

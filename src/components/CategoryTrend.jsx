import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    Title
);

export default function CategoryTrend({ data }) {

    const chartData = {
        labels: data.map(item => item.category),

        datasets: [
            {
                label: "% of Conversations",
                data: data.map(item => Number(item.percentage)),
                backgroundColor: [
                    "#3B82F6",
                    "#14B8A6",
                    "#F59E0B",
                    "#8B5CF6",
                    "#EF4444",
                    "#06B6D4",
                    "#10B981",
                ],
                borderRadius: 8,
            },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const row = data[context.dataIndex];

                        return `${row.total} conversations (${row.percentage}%)`;
                    },
                },
            },
        },

        scales: {
            x: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: "Percentage (%)",
                },
            },
        },
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header">
                <h5 className="mb-0">
                    Top Query Categories
                </h5>
            </div>
            <div className="card-body">
                <div style={{ height: 350 }}>
                    <Bar
                        data={chartData}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
}
import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
);

export default function ResolutionTrend({ data }) {

    const chartData = {
        labels: data.map(item =>
            new Date(`${item.month}-01`).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            })
        ),

        datasets: [
            {
                label: "Resolved",
                data: data.map(item => Number(item.resolved)),
                borderColor: "#22C55E",
                backgroundColor: "#22C55E",
                tension: 0.4,
            },
            {
                label: "Follow Up",
                data: data.map(item => Number(item.followup)),
                borderColor: "#F59E0B",
                backgroundColor: "#F59E0B",
                tension: 0.4,
            },
            {
                label: "Unresolved",
                data: data.map(item => Number(item.unresolved)),
                borderColor: "#EF4444",
                backgroundColor: "#EF4444",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
            },
        },

        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header">
                <h5 className="mb-0">
                    Conversations Trend
                </h5>
            </div>
            <div className="card-body">
                <div style={{ height: "350px" }}>
                    <Line
                        data={chartData}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
}
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const SessionTrend = ({ trend = [] }) => {

    const data = {
        labels: trend.map((t) =>
            new Date(t.date).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
            })
        ),
        datasets: [
            {
                label: "Sessions",
                data: trend.map((t) => t.count),
                backgroundColor: "#437ed5",
            },
        ],
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">
                    Session Trend
                </h5>
            </div>

            <div className="card-body">
                <Bar
                    data={data}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default SessionTrend;
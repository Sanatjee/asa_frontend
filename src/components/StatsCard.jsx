import React from "react";

const StatsCard = ({ title, metric, icon, color }) => {
    return (
        <div className="col-12 col-sm-6 col-lg-3 mb-4">
            <div className="card h-100">
                <div className="card-body py-3 px-3">
                    <div className="d-flex justify-content-between align-items-center">

                        <div>
                            <small className="text-muted fw-semibold">
                                {title}
                            </small>

                            <h3 className="mb-0 mt-1 fw-bold">
                                {metric}
                            </h3>
                        </div>

                        {icon && (
                            <div
                                className={`avatar flex-shrink-0 bg-label-${color}`}
                                style={{
                                    width: "42px",
                                    height: "42px",
                                }}
                            >
                                <span className="avatar-initial rounded">
                                    <i
                                        className={`${icon} fs-4`}
                                    ></i>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
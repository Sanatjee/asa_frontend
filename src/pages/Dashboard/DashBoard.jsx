import React, { useEffect, useState } from "react";

import GreetUser from "../../components/GreetUser";
import StatsCard from "../../components/StatsCard";

import dashboardStats from "../../utils/dashboardStats";
import dashboardService from "../../services/dashboardService";

import RecentConversations from "../../components/RecentConversations";
import SessionTrend from "../../components/SessionTrend";
import Permission from "../../components/Permission";

const Dashboard = () => {

    const [metrics, setMetrics] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMetrics();
    }, []);

    const loadMetrics = async () => {

        try {

            const response =
                await dashboardService.getMetrics();

            setMetrics(response.data.data);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-xxl flex-grow-1 container-p-y">

            <div className="row mb-4">

                <div className="col-12">
                    <GreetUser />
                </div>

            </div>
            <Permission permission="dashboard.stats.view">
              <div className="row">

                  {dashboardStats.map((item) => (

                      <StatsCard
                          key={item.res_key}
                          title={item.title}
                          metric={metrics[item.res_key] ?? 0}
                          loading={loading}
                          icon={item.icon}
                          color={item.color}
                      />

                  ))}

              </div>

              <div className="row mt-4">

                  <div className="col-lg-12">

                      <RecentConversations
                          sessions={
                              metrics.recent_conversations ??
                              []
                          }
                      />

                  </div>

                  <div className="col-lg-12 mt-4">

                      <SessionTrend
                          trend={
                              metrics.session_trend ??
                              []
                          }
                      />

                  </div>

              </div>
            </Permission>

        </div>
    );
};

export default Dashboard;
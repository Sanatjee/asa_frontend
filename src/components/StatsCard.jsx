import React from 'react'

const StatsCard = ({title,metric}) => {
  
  return (
    <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-6">
        <div className="card h-100">
            <div className="card-header d-flex justify-content-between">
                <div className="card-title mb-0">
                <h5 className="mb-1 me-2">{title}</h5>
                
                </div>
                
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-6">
                <div className="d-flex flex-column align-items-center gap-1">
                    <h3 className="mb-1">{metric}</h3>
                </div>
                <div id="orderStatisticsChart" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default StatsCard
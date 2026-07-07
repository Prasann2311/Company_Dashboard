import React from 'react';

const StatsCard = ({ title, value, icon }) => {
    return (
        <div className="stat-card">
            <div className="stat-title">{title}</div>
            <div className="stat-value">
                {icon} {value}
            </div>
        </div>
    );
};

export default StatsCard;
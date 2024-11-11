import React from 'react';
import './DashboardOrganisation.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="title">Dashboard</h1>
      <div className="dashboard-items">
        <div className="card inventory-management">
          <h2>Inventory Management and Tracking</h2>
          <p>Monitor and manage your stock levels, suppliers, and orders.</p>
          {/* Add more components or data here */}
        </div>
        <div className="card sales-analysis">
          <h2>Sales Analysis and Forecasting</h2>
          <p>Analyze sales trends and forecast future sales.</p>
          {/* Add data visualization components here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

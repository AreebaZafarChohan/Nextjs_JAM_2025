import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h3 className="text-2xl">Dashboard Overview</h3>
      <div className="flex space-x-4">
        <div className="bg-white shadow-md p-4 w-1/3">
          <h4>Total Revenue</h4>
          <p>$120,000</p>
        </div>
        <div className="bg-white shadow-md p-4 w-1/3">
          <h4>Total Sales</h4>
          <p>1,200 Sales</p>
        </div>
        <div className="bg-white shadow-md p-4 w-1/3">
          <h4>Total Users</h4>
          <p>5,300 Users</p>
        </div>
      </div>
      <div className="mt-6 bg-white p-4 shadow-md">
        <h4>Latest Sales</h4>
        <ul>
          <li>Sale 1: $500</li>
          <li>Sale 2: $350</li>
          <li>Sale 3: $600</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

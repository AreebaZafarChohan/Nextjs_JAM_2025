import React from "react";

interface ContentProps {
  activeTab: string;
}

const Content: React.FC<ContentProps> = ({ activeTab }) => {
  switch (activeTab) {
    case "dashboard":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-200 rounded shadow">
              <h3>Total Revenue</h3>
              <p>$5000</p>
            </div>
            <div className="p-4 bg-gray-200 rounded shadow">
              <h3>Total Sales</h3>
              <p>300</p>
            </div>
            <div className="p-4 bg-gray-200 rounded shadow">
              <h3>Total Users</h3>
              <p>1200</p>
            </div>
          </div>
          <h4>Latest Sales:</h4>
          <ul>
            <li>Sale 1: Product A - $100</li>
            <li>Sale 2: Product B - $200</li>
            <li>Sale 3: Product C - $50</li>
          </ul>
        </div>
      );

    case "analytics":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Analytics</h2>
          <p>Here you can add analytics content...</p>
        </div>
      );

    case "stock":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Stock</h2>
          <p>Here you can add stock-related content...</p>
        </div>
      );

    case "monthly_sales":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Monthly Sale</h2>
          <p>Here you can add monthly sale content...</p>
        </div>
      );

    case "users":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Users</h2>
          <p>Here you can add user-related content...</p>
        </div>
      );

    default:
      return <div>Select a tab</div>;
  }
};

export default Content;

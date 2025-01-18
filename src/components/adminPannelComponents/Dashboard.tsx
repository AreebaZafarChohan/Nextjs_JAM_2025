"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Users";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar setActiveTab={setActiveTab} />

      {/* Content */}
      <div className="flex-1 p-8">
        <Content activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import Header from "../../component/Header";
import SideBar from "../../component/SideBar";
import Footer from "../../component/Footer";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b">
        <Header toggleSidebar={() => setSidebarOpen((p) => !p)} />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-16 bottom-12 left-0 ${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white transition-all duration-300`}
      >
        <SideBar sidebarOpen={sidebarOpen} />
      </div>

      {/* ✅ CONTENT — THIS IS THE FIX */}
      <main
        className={`mt-16 mb-12 ${
          sidebarOpen ? "ml-64" : "ml-20"
        } p-6 bg-gray-50 overflow-y-auto transition-all duration-300`}
        style={{
          height: "calc(100vh - 64px - 48px)", // 👈 CRITICAL
        }}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-white border-t">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import "@/app/globals.css";
import DashboardSidebar from "./_components/dashboard-sidebar";
import DashboardNavbar from "./_components/dashboard-navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex">
      <div>
        <DashboardSidebar />
      </div>
      <div className="w-full">
        <DashboardNavbar />
        <main className="p-[30px]">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

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
        <div className="overflow-x-auto md:overflow-x-visible">
          <main className="min-w-[600px] md:min-w-0 p-[30px]">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

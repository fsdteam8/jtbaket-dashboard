"use client";
import React from "react";
import { DashboardSidebardData } from "./dashboard-sidebar-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

const DashboardSidebar = () => {
  const pathName = usePathname();
  return (
    <div className="sticky top-0 z-50">
      <div
        style={{
          boxShadow: `
    -2px -4px 10px 0px #0000001A,
    -8px -16px 18px 0px #00000017,
    -18px -35px 24px 0px #0000000D,
    -33px -62px 28px 0px #00000003,
    -51px -97px 31px 0px #00000000
  `,
        }}
        className="h-screen w-[232px] max-w-[252px] bg-[#F8FEFF] relative"
      >
        <div className="pt-[20px] pb-[24px] text-3xl font-bold text-primary leading-normal px-4">
          LOGO
        </div>
        <div>
          {DashboardSidebardData?.map((item) => {
            return (
              <div
                key={item.id}
                className={`flex items-center gap-2 text-base font-bold leading-[120%] tracking-[0%] px-[16px] py-[14px] mb-[14px] ${
                  pathName === item?.href
                    ? "bg-secondary text-white"
                    : "bg-transparent text-[#525151]"
                }`}
              >
                <p className="w-6 h-6">{item.icon}</p>
                <Link href={item.href}>{item.name}</Link>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-8 ">
          <button className="flex items-center gap-2 text-base text-secondary leading-[120%] tracking-[0%] font-manrope font-bold pl-4">
            <LogOut />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;

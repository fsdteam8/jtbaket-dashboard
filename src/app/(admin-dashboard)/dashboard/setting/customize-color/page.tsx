import React from "react";
import CustomizeColor from "./_components/customize-color";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const CustomizeColorPage = () => {
  return (
    <div className="py-[52px] px-8 bg-white rounded-[16px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]">
      <div>
        <h2 className="text-2xl font-bold text-[#131313] leading-[120%]">
          Customize color
        </h2>
        <div className="flex items-center gap-2 pt-[14px]">
          <Link
            href="/dashboard"
            className="text-base text-[#929292] font-medium leading-[120%] hover:text-secondary hover:underline"
          >
            Dashboard
          </Link>
          <ChevronRight className="text-[#929292] w-[18px] h-[18px]" />
          <Link
            href="/dashboard/setting"
            className="text-base text-[#929292] font-medium leading-[120%] hover:text-secondary hover:underline"
          >
            Settings
          </Link>
          <ChevronRight className="text-[#929292] w-[18px] h-[18px]" />
          <span className="text-base text-[#929292] font-medium leading-[120%]">
            Customize color
          </span>
        </div>
      </div>
      <div className="pt-[46px] w-full flex items-center justify-end">
        <CustomizeColor />
      </div>
    </div>
  );
};

export default CustomizeColorPage;

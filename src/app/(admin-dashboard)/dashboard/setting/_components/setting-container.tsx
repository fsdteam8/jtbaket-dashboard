import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const SettingContainer = () => {
  return (
    <div>
      <div className="py-[52px] px-8 bg-white rounded-[16px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]">
        <h2 className="text-2xl font-bold text-[#131313] leading-[120%]">
          Settings
        </h2>
        <div className="flex items-center gap-2 pt-[14px]">
          <Link
            href="/dashboard"
            className="text-base text-[#929292] font-medium leading-[120%] hover:text-secondary hover:underline"
          >
            Dashboard
          </Link>
          <ChevronRight className="text-[#929292] w-[18px] h-[18px]" />
          <p className="text-base text-[#929292] font-medium leading-[120%]">
            Settings
          </p>
        </div>

        <div className="pt-10">
          <Link href="/dashboard/setting/personal-information">
            <button className="w-full flex items-center justify-between text-2xl font-medium text-[#1F2937] leading-[120%] p-4 rounded-full bg-white border border-[#BABABA] ">
              Personal Information <ChevronRight className="text-secondary" />
            </button>{" "}
          </Link>
          <Link href="/dashboard/setting/change-password">
            {" "}
            <button className="w-full flex items-center justify-between text-2xl font-medium text-[#1F2937] leading-[120%] p-4 rounded-full bg-white border border-[#BABABA] my-5">
              Change Password <ChevronRight className="text-secondary" />
            </button>{" "}
          </Link>
          
          <Link href="/dashboard/setting/customize-color">
            {" "}
            <button className="w-full flex items-center justify-between text-2xl font-medium text-[#1F2937] leading-[120%] p-4 rounded-full bg-white border border-[#BABABA] ">
              Customize Color <ChevronRight className="text-secondary" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingContainer;

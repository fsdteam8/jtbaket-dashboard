import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserManagementHeader = () => {
  return (
    <div className="px-[50px]">
      <h2 className="text-2xl font-bold text-[#131313] leading-[120%]">
        User Management
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
          User Management
        </p>
      </div>
    </div>
  );
};

export default UserManagementHeader;

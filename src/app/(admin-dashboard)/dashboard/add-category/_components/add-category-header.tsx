import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddCategoryHeader = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-[#131313] leading-[120%]">
          Add Category
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
            category
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryHeader;

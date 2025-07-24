import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const EditCategoryHeader = ({categoryId}: {categoryId: string}) => {
  return (
    <div className="flex items-center justify-between px-[50px]">
      <div>
        <h2 className="text-2xl font-bold text-[#131313] leading-[120%]">
          Edit Category
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
            href="/dashboard/category"
            className="text-base text-[#929292] font-medium leading-[120%] hover:text-secondary hover:underline"
          >
            Category
          </Link>
          <ChevronRight className="text-[#929292] w-[18px] h-[18px]" />
          <p className="text-base text-[#929292] font-medium leading-[120%]">
            Edit Category
          </p>
          <ChevronRight className="text-[#929292] w-[18px] h-[18px]" />
          <p className="text-base text-[#929292] font-medium leading-[120%]">
            {categoryId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryHeader;

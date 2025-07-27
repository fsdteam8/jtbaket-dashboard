import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductManagementHeader = () => {
  return (
    <div className="flex items-center justify-between px-[18px]">
      <div>
        <h2 className="text-2xl font-bold text-[#131313] leading-[120%]">
          Product Management
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
            Product Management
          </p>
        </div>
      </div>
      <div>
        <Link href="/dashboard/product-management/add-product">
          <button className="flex items-center gap-2 text-base text-white font-medium leading-[120%] bg-primary py-[15px] px-[26px] rounded-full">
            <Plus className="w-6 h-6" /> Add Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductManagementHeader;

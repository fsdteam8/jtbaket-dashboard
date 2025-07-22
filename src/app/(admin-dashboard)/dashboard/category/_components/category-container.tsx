"use client";
import JtbaketPagination from "@/components/ui/JtbaketPagination";
import { SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";

export type UserOrder = {
  id: number;
  name: string;
  date: string;
};

export const userOrderList: UserOrder[] = [
  {
    id: 1,
    name: "John Smith",
    date: "2022-01-01",
  },
  {
    id: 2,
    name: "John Smith",
    date: "2022-01-01",
  },
];

const CategoryContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="mt-8 pb-[64px]">
      <div>
        <table className="w-full  ">
          <thead className="">
            <tr>
              <th className="text-left text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px] pl-[50px]">
                Name
              </th>
              <th className="text-center text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                Date
              </th>
              <th className="text-right text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px] pr-[50px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {userOrderList?.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="border-y border-dashed border-[#B6B6B6] "
                >
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-left pl-[50px]">
                    {item?.name}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.date}
                  </td>
                  <td className="py-[30px] flex items-center justify-end gap-4 text-right pr-[50px]">
                    <button className="">
                      <SquarePen className="w-5 h-5" />
                    </button>
                    <button className="">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="">
          {
            <div className="bg-white flex items-center justify-between py-[10px] px-[50px]">
              <p className="text-sm font-medium leading-[120%] font-manrope text-[#707070]">
                Showing {currentPage} to 8 of 10 results
              </p>

              <div>
                <JtbaketPagination
                  totalPages={10}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CategoryContainer;

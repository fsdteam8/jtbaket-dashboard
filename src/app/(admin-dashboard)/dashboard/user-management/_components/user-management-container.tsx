"use client";
import JtbaketPagination from "@/components/ui/JtbaketPagination";
import React, { useState } from "react";
import UserInfoDetails from "./user-details";

export type UserOrder = {
  id: number;
  userId: number;
  userName: string;
  avatar: string;
  totalOrder: number;
  deliveredOrder: number;
  pendingOrder: number;
  cancelOrder: number;
};

export const userOrderList: UserOrder[] = [
  {
    id: 1,
    userId: 2201,
    userName: "John Smith",
    avatar: "/assets/images/profile-img.jpg",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 2,
    userId: 2201,
    userName: "John Smith",
    avatar: "/assets/images/profile-img.jpg",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 3,
    userId: 2201,
    userName: "John Smith",
    avatar: "/assets/images/profile-img.jpg",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 4,
    userId: 2201,
    userName: "John Smith",
    avatar: "/assets/images/profile-img.jpg",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 5,
    userId: 2201,
    userName: "John Smith",
    avatar: "/assets/images/profile-img.jpg",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 6,
    userId: 2201,
    userName: "John Smith",
    avatar: "/assets/images/profile-img.jpg",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
  {
    id: 7,
    userId: 2201,
    userName: "John Smith",
    avatar: "/assets/images/profile-img.jpg",
    totalOrder: 200,
    deliveredOrder: 170,
    pendingOrder: 20,
    cancelOrder: 10,
  },
];

const UserManagementContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDetails, setViewDetails] = useState(false);
  return (
    <div className="mt-8 pb-[64px]">
      <div>
        <table className="w-full px-[50px]">
          <thead className="">
            <tr>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                User ID
              </th>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                User Name
              </th>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                Total Order
              </th>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                Delivered Order
              </th>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                Pending Order
              </th>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                Cancel Order
              </th>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
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
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.userId}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.userName}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.totalOrder}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.deliveredOrder}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.pendingOrder}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.cancelOrder}
                  </td>
                  <td className="py-[30px] flex items-center justify-center">
                    <button
                      onClick={() => setViewDetails(true)}
                      className="text-sm font-normal leading-[120%] text-white  bg-secondary py-[6px] px-[27px] rounded-[4px]"
                    >
                      Details
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

      {/* view details modals  */}
      {viewDetails && (
        <UserInfoDetails
          open={viewDetails}
          onOpenChange={() => setViewDetails(false)}
        />
      )}
    </div>
  );
};

export default UserManagementContainer;

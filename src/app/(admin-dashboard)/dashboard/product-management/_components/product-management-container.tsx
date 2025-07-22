"use client";
import JtbaketPagination from "@/components/ui/JtbaketPagination";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export type UserOrder = {
  id: number;
  product: string;
  productName: string;
  type: string;
  stock: number;
  price: number;
};

export const userOrderList: UserOrder[] = [
  {
    id: 1,
    productName: "John Smith",
    product: "/assets/images/product.jpg",
    type: "InDoor",
    stock: 25,
    price: 650,
  },
  {
    id: 2,
    productName: "John Smith",
    product: "/assets/images/product.jpg",
    type: "OutDoor",
    stock: 25,
    price: 650,
  },
  {
    id: 3,
    productName: "John Smith",
    product: "/assets/images/product.jpg",
    type: "InDoor",
    stock: 25,
    price: 650,
  },
  {
    id: 4,
    productName: "John Smith",
    product: "/assets/images/product.jpg",
    type: "InDoor",
    stock: 25,
    price: 650,
  },
  {
    id: 5,
    productName: "John Smith",
    product: "/assets/images/product.jpg",
    type: "InDoor",
    stock: 25,
    price: 650,
  },
  {
    id: 6,
    productName: "John Smith",
    product: "/assets/images/product.jpg",
    type: "InDoor",
    stock: 25,
    price: 650,
  },
  {
    id: 7,
    productName: "John Smith",
    product: "/assets/images/product.jpg",
    type: "InDoor",
    stock: 25,
    price: 650,
  },
];

const ProductManagementContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="mt-8 pb-[64px]">
      <div>
        <table className="w-full px-[50px]">
          <thead className="">
            <tr>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                Product
              </th>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                Product Name
              </th>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                Type
              </th>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                Stock
              </th>
              <th className="text-base font-bold text-primary-50 leading-[120%] tracking-[0%] font-manrope py-[15px]">
                Price
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
                  <td className="flex items-center justify-center text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    <Image
                      src={item?.product}
                      alt="product"
                      width={40}
                      height={40}
                    />
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.productName}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.type}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.stock}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    ${item?.price}
                  </td>
                  <td className="py-[30px] flex items-center justify-center">
                    <button className="">
                      <EllipsisVertical />
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

export default ProductManagementContainer;

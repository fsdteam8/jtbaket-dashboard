"use client";
import DeleteModal from "@/components/modals/DeleteModal";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import JtbaketPagination from "@/components/ui/JtbaketPagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type GetAllProductsResponse = {
  status: boolean;
  message: string;
  data: {
    products: Product[];
    pagination: Pagination;
  };
};

export type Product = {
  _id: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  description: string;
  thumbnail: string;
  category: string | null;
  stockStatus: "inStock" | "outOfStock"; // Add more if needed
  productId: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  __v: number;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

const ProductManagementContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();

  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  // console.log({ token });
  // get api logic
  const { data, isLoading, isError, error } = useQuery<GetAllProductsResponse>({
    queryKey: ["product-all-data", currentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?page=${currentPage}&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json()),
  });

  console.log(data);

  // delete api logic
  const { mutate: deleteBlog } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (id: string) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Failed to delete product");
        return;
      } else {
        toast.success(data?.message || "product deleted successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["product-all-data"] });
    },
  });

  // delete modal logic
  const handleDelete = () => {
    if (selectedProductId) {
      deleteBlog(selectedProductId);
    }
    setDeleteModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="mt-10">
        <TableSkeletonWrapper count={6} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="mt-10">
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  }

  if (data?.data?.products?.length === 0) {
    return (
      <div className="mt-10">
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  }
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
            {data?.data?.products?.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="border-y border-dashed border-[#B6B6B6] "
                >
                  <td className="flex items-center justify-center text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    <Image
                      src={item?.thumbnail || "/assets/images/no-img.jpg"}
                      alt="product"
                      width={40}
                      height={40}
                    />
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.name}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.type}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {item?.stockStatus}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    ${item?.price}
                  </td>
                  <td className="py-[30px] flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white">
                        <DropdownMenuLabel className="cursor-pointer text-base text-primary font-medium">Edit</DropdownMenuLabel>
                        <DropdownMenuLabel onClick={() => {
                        setDeleteModalOpen(true);
                        setSelectedProductId(item?._id);
                      }} className="cursor-pointer text-base text-red-500 font-medium">Delete</DropdownMenuLabel>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="">
          {data &&
            data?.data &&
            data?.data?.pagination &&
            data?.data?.pagination?.totalPages > 1 && (
              <div className="bg-white flex items-center justify-between py-[10px] px-[50px]">
                <p className="text-sm font-medium leading-[120%] font-manrope text-[#707070]">
                  Showing {currentPage} to 6 of{" "}
                  {data?.data?.pagination?.totalPages} results
                </p>

                <div>
                  <JtbaketPagination
                    totalPages={data?.data?.pagination?.totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            )}
        </div>
      </div>
      {/* delete modal  */}
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ProductManagementContainer;

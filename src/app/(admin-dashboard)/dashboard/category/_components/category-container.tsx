"use client";
import JtbaketPagination from "@/components/ui/JtbaketPagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SquarePen, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import moment from "moment";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import NotFound from "@/components/shared/NotFound/NotFound";
import Link from "next/link";
import DeleteModal from "@/components/modals/DeleteModal";
import { toast } from "sonner";

export type CategoryResponse = {
  status: boolean;
  message: string;
  data: {
    categories: Category[];
    pagination: Pagination;
  };
};

export type Category = {
  _id: string;
  name: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

const CategoryContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  // console.log({ token });
  // get api logic
  const { data, isLoading, isError, error } = useQuery<CategoryResponse>({
    queryKey: ["category-all-data", currentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/category?page=${currentPage}&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json()),
  });

  // delete api logic
  const { mutate: deleteBlog } = useMutation({
    mutationKey: ["delete-categiry"],
    mutationFn: (id: string) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Failed to delete category");
        return;
      } else {
        toast.success(data?.message || "category deleted successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["category-all-data"] });
    },
  });

  // delete modal logic
  const handleDelete = () => {
    if (selectedBlogId) {
      deleteBlog(selectedBlogId);
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

  if (data?.data?.categories?.length === 0) {
    return (
      <div className="mt-10">
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  }

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
            {data?.data?.categories?.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="border-y border-dashed border-[#B6B6B6] "
                >
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-left pl-[50px]">
                    {item?.name}
                  </td>
                  <td className="text-base font-medium leading-[120%] text-primary-50 py-[30px] text-center">
                    {moment(item?.createdAt).format("MM/DD/YYYY")}
                  </td>
                  <td className="py-[30px] flex items-center justify-end gap-4 text-right pr-[50px]">
                    <Link
                      href={`/dashboard/category/edit-category/${item._id}`}
                    >
                      <button className="">
                        <SquarePen className="w-5 h-5" />
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setDeleteModalOpen(true);
                        setSelectedBlogId(item?._id);
                      }}
                      className=""
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
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
                  Showing {currentPage} to 8 of{" "}
                  {data?.data?.pagination?.totalData} results
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

export default CategoryContainer;

"use client";

import React, { useState } from "react";
import UserInfoDetails from "./user-details";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { UsersApiResponseType } from "../../../../../../types/UserAddressType";
import JtbaketPagination from "@/components/ui/JtbaketPagination";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UserManagementContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDetails, setViewDetails] = useState(false);
  const [userId, setUserId] = useState<string>("");

  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<UsersApiResponseType>({
    queryKey: ["all-users", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/all-users?page=${currentPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
    enabled: !!token,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      userId,
      newStatus,
    }: {
      userId: string;
      newStatus: string;
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${userId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      toast.success("User status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const users = data?.data.users || [];
  const pagination = data?.data.pagination;

  return (
    <div className="mt-8 pb-[64px]">
      <div>
        <table className="w-full px-[50px]">
          <thead>
            <tr>
              <th className="text-base font-bold text-primary-50 py-[15px]">
                User Name
              </th>
              <th className="text-base font-bold text-primary-50 py-[15px]">
                Email
              </th>
              <th className="text-base font-bold text-primary-50 py-[15px]">
                Status
              </th>
              <th className="text-base font-bold text-primary-50 py-[15px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(5)].map((_, idx) => (
                <tr
                  key={idx}
                  className="border-y border-dashed border-[#B6B6B6] animate-pulse"
                >
                  <td className="py-[30px] text-center">
                    <div className="h-5 bg-gray-300 rounded w-24 mx-auto"></div>
                  </td>
                  <td className="py-[30px] text-center">
                    <div className="h-5 bg-gray-300 rounded w-40 mx-auto"></div>
                  </td>
                  <td className="py-[30px] text-center">
                    <div className="h-8 bg-gray-300 rounded w-20 mx-auto"></div>
                  </td>
                </tr>
              ))
            ) : users.length > 0 ? (
              users.map((item) => (
                <tr
                  key={item._id}
                  className="border-y border-dashed border-[#B6B6B6]"
                >
                  <td className="text-base font-medium text-primary-50 py-[30px] text-center">
                    {item.name}
                  </td>
                  <td className="text-base font-medium text-primary-50 py-[30px] text-center">
                    {item.email}
                  </td>
                  <td className="text-base font-medium text-primary-50 py-[30px] text-center">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateStatusMutation.mutate({
                          userId: item._id,
                          newStatus: e.target.value,
                        })
                      }
                      className={`py-1 px-2 rounded-md text-sm font-medium text-center border
    ${
      item.status === "approved"
        ? "bg-green-100 text-green-700 border-green-300"
        : item.status === "pending"
        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
        : "bg-gray-100 text-gray-700 border-gray-300"
    }
  `}
                    >
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      {/* <option value="rejected">Rejected</option> */}
                    </select>
                  </td>
                  <td className="py-[30px] flex items-center justify-center">
                    <Button
                      onClick={() => {
                        setViewDetails(true);
                        setUserId(item._id);
                      }}
                      className="text-sm font-normal bg-primary text-white px-[27px] py-[6px] rounded-[4px]"
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {pagination && (
          <div className="bg-white flex justify-between items-center px-[50px] py-[10px]">
            <div className="text-sm font-medium font-manrope text-[#707070]">
              Showing page {pagination.currentPage} of {pagination.totalPages}{" "}
              results
            </div>
            <div>
              <JtbaketPagination
                totalPages={pagination.totalPages}
                currentPage={pagination.currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {viewDetails && (
        <UserInfoDetails
          userid={userId}
          open={viewDetails}
          onOpenChange={() => setViewDetails(false)}
        />
      )}
    </div>
  );
};

export default UserManagementContainer;

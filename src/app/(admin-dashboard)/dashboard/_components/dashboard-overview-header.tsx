"use client";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import DashboardOverviewErrorContainer from "./dashboard-overview-error-container";
import DashboardCardSkeleton from "./dashboard-overview-skeleton-container";

export type DashboardSummaryResponse = {
  status: "success";
  message: string;
  data: {
    approvedUsers: number;
    pendingUsers: number;
    uniqueFavoriteProducts: number;
    totalUsers: number;
  };
};

const DashboardOverviewHeader = () => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  console.log({ token });

  const { data, isLoading, isError, error } =
    useQuery<DashboardSummaryResponse>({
      queryKey: ["dashboard-overview"],
      queryFn: () =>
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
    });
  if (isLoading) {
    return (
      <div>
        <DashboardCardSkeleton />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <DashboardOverviewErrorContainer message={error?.message} />
      </div>
    );
  }
  console.log(data);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
        <div className="md:col-span-1 w-full flex items-center justify-between bg-[#FFFFFF] rounded-[8px] shadow-[0px_0px_4px_0px_#00000040] py-8 px-3">
          <div>
            <h3 className="text-2xl text-primary font-extrabold leading-[120%] traking-[0%]">
              Approval
            </h3>
            <p className="flex items-center gap-1 text-lg font-normal leading-[170%] text-[#424242] pt-2">
              <GoDotFill className="w-6 h-6 text-secondary" />{" "}
              {data?.data?.approvedUsers}
            </p>
          </div>
          <div>
            <Image
              src="/assets/images/approval.png"
              alt="approval image"
              width={54}
              height={54}
            />
          </div>
        </div>
        <div className="md:col-span-1 w-full flex items-center justify-between bg-[#FFFFFF] rounded-[8px] shadow-[0px_0px_4px_0px_#00000040] py-8 px-3">
          <div>
            <h3 className="text-2xl text-primary font-extrabold leading-[120%] traking-[0%]">
              All Favorite
            </h3>
            <p className="flex items-center gap-1 text-lg font-normal leading-[170%] text-[#424242] pt-2">
              <GoDotFill className="w-6 h-6 text-[#FF3333]" />{" "}
              {data?.data?.uniqueFavoriteProducts}
            </p>
          </div>
          <div>
            <Image
              src="/assets/images/favorite.png"
              alt="favorite image"
              width={54}
              height={54}
            />
          </div>
        </div>
        <div className="md:col-span-1 w-full flex items-center justify-between bg-[#FFFFFF] rounded-[8px] shadow-[0px_0px_4px_0px_#00000040] py-8 px-3">
          <div>
            <h3 className="text-2xl text-primary font-extrabold leading-[120%] traking-[0%]">
              Pending
            </h3>
            <p className="flex items-center gap-1 text-lg font-normal leading-[170%] text-[#424242] pt-2">
              <GoDotFill className="w-6 h-6 text-primary" />{" "}
              {data?.data?.pendingUsers}
            </p>
          </div>
          <div>
            <Image
              src="/assets/images/pending.png"
              alt="pending image"
              width={54}
              height={54}
            />
          </div>
        </div>
        <div className="md:col-span-1 w-full flex items-center justify-between bg-[#FFFFFF] rounded-[8px] shadow-[0px_0px_4px_0px_#00000040] py-8 px-3">
          <div>
            <h3 className="text-2xl text-primary font-extrabold leading-[120%] traking-[0%]">
              Total Users
            </h3>
            <p className="flex items-center gap-1 text-lg font-normal leading-[170%] text-[#424242] pt-2">
              <GoDotFill className="w-6 h-6 text-secondary" />{" "}
              {data?.data?.totalUsers}
            </p>
          </div>
          <div>
            <Image
              src="/assets/images/total_user.png"
              alt="total user image"
              width={54}
              height={54}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverviewHeader;

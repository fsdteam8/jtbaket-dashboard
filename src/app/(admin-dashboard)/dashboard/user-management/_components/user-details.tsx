"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { GetUserResponse } from "../../../../../../types/SingelUserDetails";

const SkeletonText = () => (
  <div className="h-5 bg-gray-300 rounded animate-pulse w-3/4 mb-2"></div>
);

const SkeletonBox = () => (
  <div className="w-[193px] h-[138px] bg-gray-300 rounded animate-pulse"></div>
);

const UserInfoDetails = ({
  open,
  onOpenChange,
  userid,
}: {
  open: boolean;
  onOpenChange: () => void;
  userid: string;
}) => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data, isLoading } = useQuery<GetUserResponse>({
    queryKey: ["user", userid],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
    enabled: !!token && !!userid,
  });

  const user = data?.data;

  const renderField = (label: string, value?: string | null) => (
    <div className="pb-5">
      <h5 className="text-base font-semibold text-[#1F2937]">{label}</h5>
      {isLoading ? (
        <SkeletonText />
      ) : (
        <p className="text-base text-[#2F2F2F] pt-2">
          {value ? value : "Not provided"}
        </p>
      )}
    </div>
  );

  const renderAddress = () => {
    if (isLoading) return <SkeletonText />;

    if (!user?.address || typeof user.address !== "object") return "Not provided";

    const { postalCode, country } = user.address;
    return (
      <div className="pb-5">
        <h5 className="text-base font-semibold text-[#1F2937]">Address</h5>
        <p className="text-base text-[#2F2F2F] pt-2">
          {[postalCode, country].filter(Boolean).join(", ") || "Not provided"}
        </p>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full bg-white px-[40px] py-[40px] grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Info Section */}
        <div className="space-y-5">
          {renderField("Full Name", user?.name)}
          {renderField("Phone Number", user?.phone)}
          {renderField("Email", user?.email)}
          {renderField("Gender", user?.gender)}
          {renderField(
            "Date of Birth",
            user?.dob ? new Date(user.dob).toLocaleDateString() : undefined
          )}
          {renderAddress()}
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center">
          {isLoading ? (
            <SkeletonBox />
          ) : user?.profileImage ? (
            <Image
              src={user.profileImage}
              width={193}
              height={138}
              alt="User Image"
              className="rounded-md object-cover border"
            />
          ) : (
            <div className="w-[193px] h-[138px] flex items-center justify-center bg-gray-200 text-gray-500 rounded-md border">
              No Image
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoDetails;

"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const DashboardNavbar = () => {

  const { data: session } = useSession()

  const profile = (session?.user as { profileImage: string })?.profileImage

  return (
    <div className="sticky top-0 z-50">
      <div
        style={{
          boxShadow: `
      7px -3px 17px 0px #0000001A,
      28px -12px 30px 0px #00000017,
      62px -26px 41px 0px #0000000D,
      111px -47px 48px 0px #00000003,
      174px -73px 53px 0px #00000000
    `,
        }}
        className="w-full h-[90px] bg-[#F8FEFF] flex items-center justify-end pr-7"
      >
        <Image
          src={profile ||  "/assets/images/profile-img.jpg"}
          alt="profile image"
          width={44}
          height={44}
          className="w-[44px] h-[44px] rounded-full"
        />
      </div>
    </div>
  );
};

export default DashboardNavbar;

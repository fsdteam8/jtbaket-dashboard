import Image from "next/image";
import React from "react";

const AuthLayoutDesign = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="md:grid-cols-1">
        <Image
          src="/assets/images/authImg.png"
          width={1082}
          height={960}
          alt="auth image"
          className="w-full h-full lg:h-[850px] object-cover"
        />
      </div>
      <div className="md:grid-cols-1 h-full w-full flex items-center justify-center">{children}</div>
    </div>
  );
};

export default AuthLayoutDesign;

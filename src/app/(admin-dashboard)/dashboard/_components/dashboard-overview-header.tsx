import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import React from "react";

const DashboardOverviewHeader = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
        <div className="md:col-span-1 w-full flex items-center justify-between bg-[#FFFFFF] rounded-[8px] shadow-[0px_0px_4px_0px_#00000040] py-8 px-3">
          <div>
            <h3 className="text-2xl text-primary font-extrabold leading-[120%] traking-[0%]">
              Approval
            </h3>
            <p className="flex items-center gap-1 text-lg font-normal leading-[170%] text-[#424242] pt-2">
              <GoDotFill className="w-6 h-6 text-secondary" /> 132,570
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
              <GoDotFill className="w-6 h-6 text-[#FF3333]" /> 132,570
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
              <GoDotFill className="w-6 h-6 text-primary" /> 132,570
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
              <GoDotFill className="w-6 h-6 text-secondary" /> 132,570
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

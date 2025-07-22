import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

const UserInfoDetails = ({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: () => void;
}) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full bg-white px-[100px] py-[50px] grid grid-cols-1 md:grid-cols-2 gap-14">
          <div className="w-[195px] md:col-span-1">
            <div>
              <h5 className="text-base font-bold text-[#1F2937] leading-[150%]">
                Name
              </h5>
              <p className="text-base font-normal text-[#2F2F2F] leading-[120%] pt-[10px]">
                Jr Mbnjjkksh
              </p>
            </div>
            <div className="py-[28px]">
              <h5 className="text-base font-bold text-[#1F2937] leading-[150%]">
                Phone Number
              </h5>
              <p className="text-base font-normal text-[#2F2F2F] leading-[120%] pt-[10px]">
                +89 1234 5678
              </p>
            </div>
            <div>
              <h5 className="text-base font-bold text-[#1F2937] leading-[150%]">
                Gmail
              </h5>
              <p className="text-base font-normal text-[#2F2F2F] leading-[120%] pt-[10px]">
                admin@gmail.com
              </p>
            </div>
          </div>
          <div className="md:col-span-1">
            <h5 className="text-base font-bold text-[#1F2937] leading-[150%] pb-[10px]">
              Image
            </h5>
            <Image
              src={"/assets/images/profile-img.jpg"}
              width={193}
              height={138}
              alt="user image"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserInfoDetails;

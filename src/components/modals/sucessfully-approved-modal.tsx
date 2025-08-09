import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
// import { Button } from "../ui/button";
// import Link from "next/link";

interface SuccessfullyApprovedModalProps {
  title: string;
  desc: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuccessfullyApprovedModal: React.FC<SuccessfullyApprovedModalProps> = ({
  title,
  desc,
  open,
  onOpenChange,
}) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <div className="flex items-center justify-center pb-3">
              <div className="p-[10px] bg-[#E6F9E9] rounded-full">
                <div className="p-[10px] bg-[#B1EBBA] rounded-full">
                  <div className="p-[6px] bg-[#00B728] rounded-full flex items-center justify-center">
                    <Check className="w-[35px] h-[35px] text-white" />
                  </div>
                </div>
              </div>
            </div>
            <DialogTitle className="text-center text-[#293440] text-2xl md:text-[28px] lg:text-[32px] font-semibold leading-[138%]">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-[#293440] text-lg md:text-xl font-normal leading-[120%] pt-1 pb-6 md:pb-7 lg:pb-8">
              {desc}
            </DialogDescription>
            {/* <div className="w-full flex items-center justify-center">
              <Link href="/dashboard">
              <Button className="h-[48px] bg-secondary text-[#F8FAF9] py-[13px] rounded-full text-lg font-bold leading-[120%]">
                See The Dashboard
              </Button>
            </Link>
            </div> */}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessfullyApprovedModal;

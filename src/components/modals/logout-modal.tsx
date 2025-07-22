import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

interface LogOutModalProps {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LogOutModal: React.FC<LogOutModalProps> = ({
  title,
  open,
  onOpenChange,
}) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <div className="flex items-center justify-center">
              <div className="p-[10px] bg-[#E6F9E9] rounded-full">
                <div className="p-[10px] bg-[#B1EBBA] rounded-full">
                  <div className="p-[6px] bg-[#00B728] rounded-full flex items-center justify-center">
                    <Check className="w-[35px] h-[35px] text-white" />
                  </div>
                </div>
              </div>
            </div>
            <DialogTitle className="text-center text-[#293440] text-2xl md:text-[28px] lg:text-[32px] font-semibold leading-[138%] py-5 md:py-6 lg:py-8">
              {title}
            </DialogTitle>
            <div className="flex items-center justify-center gap-3">
              <button className="h-[51px] text-base font-medium leading-[120%] text-secondary border border-secondary py-4 px-[96px] rounded-[8px]">
                Yes
              </button>
              <button className="h-[51px] text-base font-medium leading-[120%] bg-secondary text-white  py-4 px-[99px] rounded-full">
                No
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogOutModal;

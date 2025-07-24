import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import ChangeImage from "./_components/change-image";
import PersonalInfoForm from "./_components/personal-info-form";

const PersonalInformationPage = () => {
  return (
    <div>
      <div className="py-[52px] px-8 bg-white rounded-[16px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]">
        <div>
          <h2 className="text-2xl font-bold text-[#131313] leading-[120%]">
            Personal Informatio
          </h2>
          <div className="flex items-center gap-2 pt-[14px]">
            <Link
              href="/dashboard"
              className="text-base text-[#929292] font-medium leading-[120%] hover:text-secondary hover:underline"
            >
              Dashboard
            </Link>
            <ChevronRight className="text-[#929292] w-[18px] h-[18px]" />
            <Link href="/dashboard/setting">
              <p className="text-base text-[#929292] font-medium leading-[120%]  hover:text-secondary hover:underline">
                Settings
              </p>
            </Link>
            <ChevronRight className="text-[#929292] w-[18px] h-[18px]" />
            <p className="text-base text-[#929292] font-medium leading-[120%]">
              Personal Informatio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            <div className="md:col-span-2">
              <PersonalInfoForm />
            </div>
            <div className="md:col-span-1">
              <ChangeImage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationPage;

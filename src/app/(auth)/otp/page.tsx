import React from "react";
import AuthLayoutDesign from "../_components/auth-layout";
import OtpForm from "./_components/otp-form";

const OtpFormPage = () => {
  return (
    <div>
      <AuthLayoutDesign>
        <OtpForm />
      </AuthLayoutDesign>
    </div>
  );
};

export default OtpFormPage;

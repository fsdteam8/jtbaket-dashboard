import React from "react";
import AuthLayoutDesign from "../_components/auth-layout";
import ResetPasswordForm from "./_components/reset-password-form";

const ResetPasswordPage = () => {
  return (
    <div>
      <AuthLayoutDesign>
        <ResetPasswordForm />
      </AuthLayoutDesign>
    </div>
  );
};

export default ResetPasswordPage;

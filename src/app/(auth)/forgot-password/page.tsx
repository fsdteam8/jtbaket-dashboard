import React from "react";
import AuthLayoutDesign from "../_components/auth-layout";
import ForgotPasswordForm from "./_components/forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <div>
      <AuthLayoutDesign>
        <ForgotPasswordForm />
      </AuthLayoutDesign>
    </div>
  );
};

export default ForgotPasswordPage;


import React from "react";
import LoginForm from "./_components/login-form";
import AuthLayoutDesign from "../_components/auth-layout";

const LoginPage = () => {
  return (
    <div>
      <AuthLayoutDesign>
        <LoginForm />
      </AuthLayoutDesign>
    </div>
  );
};

export default LoginPage;

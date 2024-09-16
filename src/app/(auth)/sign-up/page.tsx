import React, { FC } from "react";
import HeaderFormAuth from "../components/HeaderFormAuth";
import FormSignUp from "../components/form-signup";

interface SignUpPageProps {}

const SignUpPage: FC<SignUpPageProps> = ({}) => {
  return (
    <>
      <HeaderFormAuth
        title="Sign Up"
        subtitle="Enjoy new experience of flight"
      />
      <FormSignUp />
    </>
  );
};

export default SignUpPage;

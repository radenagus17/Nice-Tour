import FormSignIn from "../components/form-signin";
import HeaderFormAuth from "../components/HeaderFormAuth";

export default function SignInPage() {
  return (
    <>
      <HeaderFormAuth
        title="Sign In"
        subtitle="Enjoy new experience of flight"
      />
      <FormSignIn />
    </>
  );
}

import SignInForm from "@/components/Form/SignInForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading...</p>}>
        <SignInForm />
      </Suspense>
    </div>
  );
};

export default page;

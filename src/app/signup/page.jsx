import SignUpForm from "@/components/Form/SignUpForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading...</p>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
};

export default page;

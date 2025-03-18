import { Suspense } from "react";
import AuthPage from "./page";

const AuthPageWrapper = async () => {
    return (
      <>
        <Suspense>
          <AuthPage />
        </Suspense>
      </>
    );
  };
  
  export default AuthPageWrapper;
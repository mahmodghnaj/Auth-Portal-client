import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Auth from "@/components/layouts/auth";
import ForgotPassword from "@/components/auth/forgot-password";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <div className="relative w-full h-full flex items-center justify-center">
        <ForgotPassword />
      </div>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Auth>{page}</Auth>;
};

export default Page;

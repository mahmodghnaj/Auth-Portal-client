import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Auth from "@/components/layouts/auth";
import ResetPassword from "@/components/auth/reset-password";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <div className="relative w-full h-full flex items-center justify-center">
        <ResetPassword />
      </div>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Auth>{page}</Auth>;
};

export default Page;

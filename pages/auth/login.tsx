import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Auth from "@/components/layouts/auth";
import Login from "@/components/auth/login";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <div className="relative w-full h-full flex items-center justify-center">
        <Login />
      </div>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Auth>{page}</Auth>;
};
export default Page;

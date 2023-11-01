import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Auth from "@/components/layouts/auth";
import ConfirmEmail from "@/components/auth/confirm-email";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <div className="relative w-full h-full flex items-center justify-center">
        <ConfirmEmail />
      </div>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Auth>{page}</Auth>;
};
export default Page;

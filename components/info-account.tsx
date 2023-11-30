import { User } from "@/services/auth/type";
import { formatDate } from "@/utils/date";
import { BsFillInfoSquareFill } from "react-icons/bs";
type PropsComponent = {
  user: User | null;
};

const InfoAccount = ({ user }: PropsComponent) => {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Info Account</h1>
      <div className="mt-5 space-y-4">
        <div className="capitalize">
          <span className="font-bold "> Name : </span>
          {user?.firstName} {user?.lastName}
        </div>
        {!user?.socialType && user?.email && (
          <>
            <div className="flex items-center ">
              <span className="font-bold"> Email : </span>
              <span> {user?.email}</span>
              <div
                className="tooltip"
                data-tip={
                  user?.status === 1
                    ? "I have Verified The Email's Accuracy"
                    : "Email Not Verified Yet"
                }
              >
                <BsFillInfoSquareFill
                  className={`m-4 ${
                    user?.status === 1 ? "text-success" : "text-error"
                  }`}
                />
              </div>
            </div>
          </>
        )}
        {user?.socialType && (
          <>
            <div className="flex items-center ">
              <span className="font-bold"> Login By : </span>{" "}
              <span className="capitalize"> {user?.socialType}</span>
            </div>
          </>
        )}

        <div>
          <span className="font-bold "> Join Data :</span>{" "}
          {formatDate(user?.createdAt)}
        </div>
      </div>
    </>
  );
};

export default InfoAccount;

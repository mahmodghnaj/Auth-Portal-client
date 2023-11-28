import Progress from "@/components/progress";
import { selectors } from "@/store";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
type PageProps = {
  token: string | string[] | undefined;
};

const calculateProgressValue = (
  countdown: number,
  totalSteps: number
): number => {
  const clampedCountdown = Math.max(0, Math.min(countdown, totalSteps));
  const progress = (clampedCountdown / totalSteps) * 100;
  return Math.round(progress);
};

export default function Page({
  pageProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const setToken = selectors.auth.setToken();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (pageProps.token) {
      const token = Array.isArray(pageProps.token)
        ? pageProps.token[0]
        : pageProps.token;
      setToken(token);
    }

    const interval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      router.push("/");
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const progressValue = calculateProgressValue(countdown, 5);

  return (
    <div className="h-full w-full flex items-center justify-center text-7xl">
      <Progress value={progressValue}>{countdown}</Progress>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  pageProps: PageProps;
}> = async (context) => {
  const token = context.query?.token;
  return { props: { pageProps: { token } } };
};

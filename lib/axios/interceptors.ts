import useStore from "@/store";
import Cookies from "js-cookie";

import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { api } from "./api";

// If the front-end and back-end are on the same domain,
// there's no need to store the refresh token in cookies,
// as the back-end will send the refresh token in a cookie.
// This function is used for different domain scenarios.
export const setRefreshToken = (value: string) => {
  Cookies.set("refresh", value, { expires: 365 });
};
const injectRefreshToken = (config: InternalAxiosRequestConfig) => {
  const re = Cookies.get("refresh");
  const isInject = ["/auth/info-session", "/auth/refresh"];
  if (re && config.url && isInject.includes(config.url))
    config.headers.set("refresh", re);
};

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  injectRefreshToken(config);
  const token = useStore.getState().auth.token;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const config: any = error.config;
  if (error.response?.status === 401 && url && !config._retry) {
    config._retry = true;
    try {
      const response = await fetch(`${url}/auth/refresh`, {
        method: "Post",
        headers: {
          refresh: Cookies.get("refresh") || "",
        },
      });
      const res = await response.json();
      useStore.getState().auth.setToken(res.token);
      setRefreshToken(res.refreshToken);
      return api(config);
    } catch (error) {
      Cookies.remove("refresh");
      location.reload();
    }
    await Promise.reject(error);
  } else {
    if (error.response) {
      const errorMessage: ConsoleError = {
        status: error.response.status,
        data: error.response.data,
      };
      // console.log(errorMessage);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    await Promise.reject(error);
  }
};

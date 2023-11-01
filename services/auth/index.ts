import { api } from "@/lib/axios/api";
import { useMutation, useQuery } from "react-query";
import {
  EmailConfirmBody,
  ForgotPasswordBody,
  InfSession,
  LoginBody,
  LoginResponse,
  RegisterBody,
  RestPasswordBody,
  User,
} from "./type";

export const useLogin = () =>
  useMutation<LoginResponse, unknown, LoginBody>(["login"], async (body) => {
    const { data } = await api.post("/auth/login", body);
    return data;
  });

export const useRegister = () =>
  useMutation<LoginResponse, unknown, RegisterBody>(
    ["register"],
    async (body) => {
      const { data } = await api.post("/auth/register", body);
      return data;
    }
  );

export const useLogout = () =>
  useMutation(["logout"], async () => {
    const { data } = await api.post("/auth/logout");
    return data;
  });

export const useEmailConfirm = () =>
  useMutation<any, any, EmailConfirmBody>(["emailConfirm"], async (body) => {
    const { data } = await api.post("/auth/email/confirm", body);
    return data;
  });

export const useRestPassword = () =>
  useMutation<any, any, RestPasswordBody>(["restPassword"], async (body) => {
    const { data } = await api.post("/auth/reset/password", body);
    return data;
  });

export const useForgotPassword = () =>
  useMutation<any, any, ForgotPasswordBody>(
    ["forgotPassword"],
    async (body) => {
      const { data } = await api.post("/auth/forgot/password", body);
      return data;
    }
  );

export const useInfSession = () =>
  useQuery<InfSession>(["infSession"], async () => {
    const { data } = await api.post("/auth/info-session");
    return data;
  });

export const useMe = () =>
  useQuery<User>(
    ["me"],
    async () => {
      const { data } = await api.get("/auth/me");
      return data;
    },
    {
      retry: 0, // Disable automatic retries
    }
  );

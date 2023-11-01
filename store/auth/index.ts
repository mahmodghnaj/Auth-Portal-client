import { StateCreator } from "zustand";
import { IAuth } from "./type";
import storeApp from "..";

export const authStore: StateCreator<IAuth> = (set) => ({
  user: null,
  token: null,
  setToken: (token) => set(() => ({ token: token })),
  setUser: (user) => set(() => ({ user: user })),
  isAuth: false,
  setIsAuth: (value) => set(() => ({ isAuth: value })),
});

export const authSelectors = {
  user: () => storeApp((state) => state.auth.user),
  token: () => storeApp((state) => state.auth.token),
  setToken: () => storeApp((state) => state.auth.setToken),
  setUser: () => storeApp((state) => state.auth.setUser),
};

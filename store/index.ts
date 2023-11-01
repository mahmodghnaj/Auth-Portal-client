import { create } from "zustand";
import { IAuth } from "./auth/type";
import { authSelectors, authStore } from "./auth";
import { logger } from "./middleware/logger";
import { devtools, persist } from "zustand/middleware";
import namespace from "./middleware/namespace";

// @ts-ignore
const createStore: typeof create = (fn: any) => {
  return create(logger(devtools(fn)));
};

type AppState = {
  auth: IAuth;
};

const storeApp = createStore<AppState>((...a) => {
  const auth = namespace("auth", authStore)(...a);
  return {
    auth,
  };
});

export const selectors = {
  auth: { ...authSelectors },
};
export default storeApp;

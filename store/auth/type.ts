import { User } from "@/services/auth/type";

export interface IAuth {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  isAuth: boolean;
  setIsAuth: (v: boolean) => void;
}

import { authorization } from "./middleware/auth";
import { authSocial } from "./middleware/auth-social";
import { middlewareChain } from "./middleware/middleware-chain";

export default middlewareChain([authSocial, authorization]);

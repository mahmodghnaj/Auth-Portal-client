import { authorization } from "./middleware/auth";
import { middlewareChain } from "./middleware/middleware-chain";

export default middlewareChain([authorization]);

import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const isAuthenticated = async (request: NextRequest) => {
  //const refreshToken = request.cookies.get("refreshToken");
  const refreshToken = request.cookies.get("refresh");
  if (!refreshToken) return null;
  else {
    const infoSession = await getInfoSession();
    if (infoSession) return infoSession;
  }
};

async function getInfoSession() {
  const url = process.env.BAS_URL;
  if (!url) return null;
  try {
    const response = await fetch(`${url}/auth/info-session`, {
      method: "post",
      headers: {
        // If the front-end and back-end are on the same domain,
        // there's no need to store the refresh token in cookies,
        // as the back-end will send the refresh token in a cookie.
        // This function is used for different domain scenarios.
        ///////////////////////////////////////
        // Cookie: cookies()
        //   .getAll()
        //   .map(({ name, value }) => `${name}=${value}`)
        //   .join("; "),
        refresh: cookies().get("refresh")?.value || "",
      },
    });
    const res = await response.json();
    return res?.token ? res : null;
  } catch (error) {
    return null;
  }
}

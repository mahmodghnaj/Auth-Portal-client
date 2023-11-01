import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const isAuthenticated = async (request: NextRequest) => {
  const refreshToken = request.cookies.get("refreshToken");
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
        Cookie: cookies()
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
    });
    const res = await response.json();
    return res?.token ? res : null;
  } catch (error) {
    return null;
  }
}

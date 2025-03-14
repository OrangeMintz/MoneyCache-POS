import axios from "axios";

const CLIENT_ID = process.env.NEXT_PUBLIC_PASSPORT_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_PASSPORT_CLIENT_SECRET;
const BASE_URL = process.env.BASE_URL;

export const refreshAccessToken = async () => {
  if (typeof window === "undefined") return null;

  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    console.error("No refresh token found");
    return null;
  }

  try {
    const response = await axios.post(`http://127.0.0.1:8000/oauth/token`, {
      grant_type: "refresh_token",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refreshToken,
      scope: "",
    });

    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;

    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("refresh_token", newRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed:", error.response?.data || error.message);
    return null;
  }
};


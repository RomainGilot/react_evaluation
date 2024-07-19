import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      sessionStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
};

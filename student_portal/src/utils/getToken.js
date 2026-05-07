import Cookies from "js-cookie";

export function getToken() {
  const token = Cookies.get("studentToken");
  return token ? token : null;
}

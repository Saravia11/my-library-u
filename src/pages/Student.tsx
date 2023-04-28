import Cookies from "js-cookie";
import useUser from "../hooks/useUser";

export default function Student() {
  const { user } = useUser(Cookies.get("user_id") || "");

  return <h1>{user?.name}</h1>;
}

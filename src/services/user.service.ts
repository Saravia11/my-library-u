import Cookies from "js-cookie";
import useAPI from "../hooks/useAPI";
import type { User } from "../types/user";

export const login = async (carnet: string, password: string) => {
  const api = useAPI();

  const { data } = await api<User>({
    url: "/user/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      carnet,
      password,
    },
  });

  Cookies.set("user_id", data._id);
  return data;
};

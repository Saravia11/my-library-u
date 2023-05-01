import Cookies from "js-cookie";
import useAPI from "../hooks/useAPI";
import type { User, UserValues } from "../types/user";

const api = useAPI();

export const login = async (email: string, password: string) => {
  const { data } = await api<User>({
    url: "/user/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
      password,
    },
  });

  Cookies.set("user_id", data.data!._id);
  Cookies.set("user_role", data.data!.role);
  return data.data;
};

export const createUser = async (values: UserValues & { password: string }) => {
  const { status, data } = await api<User>({
    url: "/user",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(values),
  });

  return {
    success: status == 201,
    data,
  };
};

export const getAllUsers = async () => {
  const { status, data } = await api<User[]>({
    url: "/user",
  });

  return {
    success: status == 200,
    data,
  };
};

export const getUser = async (id: string) => {
  const { status, data } = await api<User>({
    url: `/user/${id}`,
  });

  return {
    success: status == 200,
    data: data.data,
  };
};

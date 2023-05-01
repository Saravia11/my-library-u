import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/user.service";

export default function useUser(id: string) {
  const { isLoading, data } = useQuery([`user`, id], () => getUser(id), {
    staleTime: Infinity,
  });

  return {
    userLoading: isLoading,
    user: data?.data,
  };
}

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/user.service";

export default function useUsers() {
  const { isLoading, data, refetch } = useQuery(["users"], getAllUsers, {
    staleTime: 10000,
  });

  return {
    usersLoading: isLoading,
    success: data?.success,
    users: data?.data.data,
    refetchUsers: refetch,
  };
}

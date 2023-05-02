import { useQuery } from "@tanstack/react-query";
import { getAllLoans } from "../services/loans.service";

export default function useLoans() {
  const { isLoading, data, refetch } = useQuery(["loans"], getAllLoans, {
    staleTime: 300000,
  });

  return {
    loansLoading: isLoading,
    loans: data?.data.data,
    refetchLoans: refetch,
  };
}

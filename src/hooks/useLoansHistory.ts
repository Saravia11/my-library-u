import { useQuery } from "@tanstack/react-query";
import { getLoansHistory } from "../services/loans.service";

export default function useLoansHistory(id: string) {
  const { isLoading, data, refetch } = useQuery(
    ["loans-history", id],
    () => getLoansHistory(id),
    {
      staleTime: 300000,
    }
  );

  return {
    loansHistoryLoading: isLoading,
    loansHistory: data?.data,
    refetchLoansHistory: refetch,
  };
}

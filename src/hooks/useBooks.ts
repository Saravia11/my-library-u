import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../services/books.service";

export default function useBooks() {
  const { isLoading, data, refetch } = useQuery(["books"], getBooks, {
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });

  return {
    booksLoading: isLoading,
    success: data?.success,
    books: data?.data,
    refetch,
  };
}

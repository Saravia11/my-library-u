import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "../services/books.service";

const useGenres = () => {
  const { isLoading, data } = useQuery(["genres"], () => getAllGenres(), {
    staleTime: Infinity,
  });

  return {
    genresLoading: isLoading,
    genres: data?.data,
  };
};
export default useGenres;

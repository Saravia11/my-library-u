import useAPI from "../hooks/useAPI";
import type { Book, Genres } from "../types/books";

const api = useAPI();

export const createBook = async (values: Book) => {
  const { data, status } = await api<Book & { _id: string }>({
    url: "/books",
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

/**
 * Get all genres from API
 */
export const getAllGenres = async () => {
  const { data } = await api<Genres[]>({
    url: "/books/genres",
  });

  return data;
};

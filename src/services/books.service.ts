import useAPI from "../hooks/useAPI";
import type { Book, Genre, BookValues } from "../types/books";

const api = useAPI();

/**
 * Create new book
 */
export const createBook = async (values: BookValues) => {
  const { data, status } = await api<Book>({
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
 * Get all books
 */
export const getBooks = async () => {
  const { status, data } = await api<Book[]>({
    url: "/books",
  });

  return {
    success: status == 200,
    data,
  };
};

/**
 * Get all genres from API
 */
export const getAllGenres = async () => {
  const { data } = await api<Genre[]>({
    url: "/books/genres",
  });

  return data;
};

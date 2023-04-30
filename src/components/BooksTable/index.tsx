import { useMemo } from "react";
import useBooks from "../../hooks/useBooks";
import Table from "../Table";
import { TableContent } from "../Table/types";
import { Book } from "../../types/books";

const BooksTable = () => {
  const { booksLoading, books } = useBooks();

  const content: TableContent<Book> = useMemo(
    () => ({
      columns: [
        {
          header: "Title",
          render: ({ title }) => title,
        },
        {
          header: "Author",
          render: ({ author }) => author,
        },
        {
          header: "Published year",
          render: ({ published_year }) => published_year,
        },
        {
          header: "Genre",
          render: ({ genre }) => genre.name,
        },
      ],
      data: books?.data!,
    }),
    [books?.data]
  );

  if (booksLoading) return <></>;
  return <Table TableProps={{ sx: { width: "50%" } }} content={content} />;
};
export default BooksTable;

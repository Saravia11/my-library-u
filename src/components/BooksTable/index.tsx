import { useState, useMemo } from "react";
import useBooks from "../../hooks/useBooks";
import Table from "../Table";
import {
  DialogContent,
  DialogTitle,
  Typography,
  Dialog,
  Button,
} from "@mui/material";
import type { TableContent } from "../Table/types";
import type { Book } from "../../types/books";
import type { BooksTableType } from "./index.d";
import { checkOutBook } from "../../services/books.service";

const BooksTable: BooksTableType = ({ canOrder, onCheckout }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [book, setBook] = useState<Book>();
  const { booksLoading, books, refetch } = useBooks();

  const handleRowClick = (item: Book) => {
    setOpenDetails(true);
    setBook(item);
  };

  const handleCheckOut = async () => {
    const { success, data } = await checkOutBook(book!._id);
    setOpenDetails(false);
    onCheckout && onCheckout(success, data.message);
    refetch();
  };

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
        {
          header: "Stock",
          render: ({ stock }) => stock,
        },
      ],
      data: books?.data!,
    }),
    [books?.data]
  );

  if (booksLoading) return <></>;
  return (
    <>
      <Table
        TableProps={{ sx: { width: "50%" } }}
        content={content}
        onRowClick={canOrder ? handleRowClick : undefined}
      />
      {canOrder && (
        <Dialog open={openDetails} onClose={() => setOpenDetails(false)}>
          <DialogTitle textAlign="center">
            <Typography>Book: {book?.title}</Typography>
          </DialogTitle>
          <DialogContent>
            <div style={{ marginBottom: "15px" }}>
              <Typography>Author: {book?.author}</Typography>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Typography>Published year: {book?.published_year}</Typography>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Typography>Genre: {book?.genre.name}</Typography>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Typography>Stock: {book?.stock}</Typography>
            </div>
            <Button
              variant="contained"
              color="success"
              sx={{ width: "300px" }}
              onClick={handleCheckOut}
              disabled={!book || book.stock == 0}
            >
              Check out this book
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
export default BooksTable;

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import BookFormDialog from "../components/BookFormDialog";
import BooksTable from "../components/BooksTable";
import useBooks from "../hooks/useBooks";

export default function Librarian() {
  const [openBookForm, setOpenBookForm] = useState(false);
  const { refetch } = useBooks();

  const handleCreationFinish = (success: boolean, message: string) => {
    setOpenBookForm(false);
    toast(message, {
      type: success ? "info" : "error",
    });
    refetch();
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpenBookForm(true)}>
        Add book
      </Button>
      <BooksTable />
      <BookFormDialog
        open={openBookForm}
        onClose={() => setOpenBookForm(false)}
        onCreationFinish={handleCreationFinish}
      />
      <ToastContainer hideProgressBar />
    </div>
  );
}

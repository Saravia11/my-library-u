import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import BookFormDialog from "../components/BookFormDialog";
import UserFormDialog from "../components/UserFormDialog";
import BooksTable from "../components/BooksTable";
import useBooks from "../hooks/useBooks";

export default function Librarian() {
  const [openBookForm, setOpenBookForm] = useState(false);
  const [openUserForm, setOpenUserForm] = useState(false);
  const { refetch: refetchBooks } = useBooks();

  const handleCreationFinish = (
    closeFormFn: (success: boolean) => void,
    message: string,
    success: boolean,
    refetchFn: () => void
  ) => {
    closeFormFn(false);
    toast(message, {
      type: success ? "info" : "error",
    });
    refetchFn();
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpenBookForm(true)}>
        Add book
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpenUserForm(true)}
      >
        Add user
      </Button>
      <BooksTable />
      <BookFormDialog
        open={openBookForm}
        onClose={() => setOpenBookForm(false)}
        onCreationFinish={(success, message) =>
          handleCreationFinish(setOpenBookForm, message, success, refetchBooks)
        }
      />
      <UserFormDialog
        open={openUserForm}
        onClose={() => setOpenUserForm(false)}
        onCreationFinish={(success, message) =>
          handleCreationFinish(setOpenUserForm, message, success, refetchBooks)
        }
      />
      <ToastContainer hideProgressBar />
    </div>
  );
}

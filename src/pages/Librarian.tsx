import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import BookFormDialog from "../components/BookFormDialog";

export default function Librarian() {
  const [openBookForm, setOpenBookForm] = useState(false);

  const handleCreationFinish = (success: boolean, message: string) => {
    setOpenBookForm(false);
    toast(message, {
      type: success ? "info" : "error",
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpenBookForm(true)}>
        Add book
      </Button>
      <BookFormDialog
        open={openBookForm}
        onClose={() => setOpenBookForm(false)}
        onCreationFinish={handleCreationFinish}
      />
      <ToastContainer hideProgressBar />
    </div>
  );
}

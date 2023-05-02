import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import BookFormDialog from "../components/BookFormDialog";
import UserFormDialog from "../components/UserFormDialog";
import BooksTable from "../components/BooksTable";
import useBooks from "../hooks/useBooks";
import UsersTable from "../components/UsersTable";
import useUsers from "../hooks/useUsers";
import LoansTable from "../components/LoansTable";
import useLoans from "../hooks/useLoans";
import Tabs from "../components/Tabs";
import { Tab } from "../components/Tabs/types";
import Navbar from "../components/Navbar";

export default function Librarian() {
  const [openBookForm, setOpenBookForm] = useState(false);
  const [openUserForm, setOpenUserForm] = useState(false);
  const { refetch: refetchBooks } = useBooks();
  const { refetchUsers } = useUsers();
  const { refetchLoans } = useLoans();

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

  const tabs: Tab[] = [
    { buttonText: "Books", component: <BooksTable /> },
    { buttonText: "Users", component: <UsersTable /> },
    {
      buttonText: "Check outs",
      component: (
        <LoansTable
          onReturnFinish={(success, message) => {
            toast(message, {
              type: success ? "success" : "error",
            });
            refetchBooks();
            refetchLoans();
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <br />
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
      <Tabs tabs={tabs} />
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
          handleCreationFinish(setOpenUserForm, message, success, refetchUsers)
        }
      />
      <ToastContainer hideProgressBar />
    </div>
  );
}

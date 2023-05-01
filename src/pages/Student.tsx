import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import useUser from "../hooks/useUser";
import BooksTable from "../components/BooksTable";

export default function Student() {
  const { user } = useUser(Cookies.get("user_id")!);

  const handleBookCheckout = (success: boolean, message: string) => {
    toast(message, {
      type: success ? "success" : "error",
    });
  };

  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <BooksTable canOrder onCheckout={handleBookCheckout} />
      <ToastContainer hideProgressBar />
    </div>
  );
}

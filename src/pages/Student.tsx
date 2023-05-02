import { ToastContainer, toast } from "react-toastify";
import BooksTable from "../components/BooksTable";
import LoansHistoryTable from "../components/LoansHistoryTable";
import { Tab } from "../components/Tabs/types";
import Tabs from "../components/Tabs";
import Navbar from "../components/Navbar";

export default function Student() {
  const handleBookCheckout = (success: boolean, message: string) => {
    toast(message, {
      type: success ? "success" : "error",
    });
  };

  const tabs: Tab[] = [
    {
      buttonText: "All books",
      component: <BooksTable canOrder onCheckout={handleBookCheckout} />,
    },
    { buttonText: "Loans", component: <LoansHistoryTable /> },
  ];

  return (
    <div>
      <Navbar />
      <Tabs tabs={tabs} />
      <ToastContainer hideProgressBar />
    </div>
  );
}

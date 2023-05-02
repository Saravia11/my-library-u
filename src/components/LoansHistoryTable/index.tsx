import Cookies from "js-cookie";
import useLoansHistory from "../../hooks/useLoansHistory";
import Table from "../Table";
import { TableContent } from "../Table/types";
import { Loan } from "../../types/loans";

const LoansHistoryTable = () => {
  const { loansHistoryLoading, loansHistory } = useLoansHistory(
    Cookies.get("user_id")!
  );

  const content: TableContent<Loan> = {
    data: loansHistory!,
    columns: [
      { header: "Book", render: ({ book }) => book.title },
      {
        header: "Loan date",
        render: ({ date }) => new Date(date).toLocaleDateString(),
      },
      { header: "State", render: ({ state }) => capitalize(state) },
    ],
  };

  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  if (loansHistoryLoading) return <></>;
  return <Table content={content} />;
};
export default LoansHistoryTable;

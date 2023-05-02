import { useMemo } from "react";
import useLoans from "../../hooks/useLoans";
import Table from "../Table";
import { Loan } from "../../types/loans";
import { TableContent, Action } from "../Table/types";
import { LoansTableType } from "./types";
import { returnBook } from "../../services/loans.service";

const LoansTable: LoansTableType = ({ onReturnFinish }) => {
  const { loansLoading, loans } = useLoans();

  const content: TableContent<Loan> = useMemo(
    () => ({
      columns: [
        {
          header: "Book",
          render: ({ book }) => book.title,
        },
        {
          header: "Student",
          render: ({ student }) => `${student.name} ${student.last_name}`,
        },
        {
          header: "Borrowed at",
          render: ({ date }) => new Date(date).toLocaleDateString(),
        },
      ],
      data: loans!,
    }),
    [loans]
  );

  const actions: Action<Loan>[] = [
    {
      label: "Return book",
      onClick: async ({ _id }) => {
        const { success, data } = await returnBook(_id);
        onReturnFinish && onReturnFinish(success, data.message);
      },
    },
  ];

  if (loansLoading) return <></>;
  return (
    <Table
      content={content}
      actions={actions}
      searchFields={[(item) => item.student.name]}
    />
  );
};
export default LoansTable;

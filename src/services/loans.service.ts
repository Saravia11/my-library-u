import useAPI from "../hooks/useAPI";
import { Loan } from "../types/loans";

const api = useAPI();

/**
 * Retrieve all loans from api
 */
export const getAllLoans = async () => {
  const { status, data } = await api<Loan[]>({
    url: "/loans",
  });

  return {
    success: status == 200,
    data,
  };
};

/**
 * Change loan state from 'borrowed' to 'returned'
 * And "return" the book to the stock
 */
export const returnBook = async (id: string) => {
  const { status, data } = await api({
    url: "/loans/return-book",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ id }),
  });

  return {
    success: status == 200,
    data,
  };
};

/**
 * Get student loans history from api
 */
export const getLoansHistory = async (userId: string) => {
  const { status, data } = await api<Loan[]>({
    url: `/loans/${userId}`,
  });

  return {
    success: status == 200,
    data: data.data,
  };
};

import { Book } from "./books";
import { User } from "./user";

export type Loan = {
  _id: string;
  book: Book;
  student: {
    _id: string;
    name: string;
    last_name: string;
  };
  date: Date;
  state: "borrowed" | "returned";
};

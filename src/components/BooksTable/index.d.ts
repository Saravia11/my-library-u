import { FC } from "react";

export type BooksTableType = FC<{
  canOrder?: boolean;
  onCheckout?: (success: boolean, message: string) => any;
}>;

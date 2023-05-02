import { FC } from "react";

export type LoansTableType = FC<{
  onReturnFinish: (success: boolean, message: string) => any;
}>;

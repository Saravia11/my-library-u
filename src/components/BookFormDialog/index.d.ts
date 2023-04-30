import { FC, MouseEventHandler } from "react";

export type BookFormDialogType = FC<{
  open: boolean;
  onClose?: MouseEventHandler<HTMLDivElement>;
  onCreationFinish?: (success: boolean, message: string) => any;
}>;

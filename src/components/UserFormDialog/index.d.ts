import { FC, MouseEventHandler } from "react";

export type UserFormDialogType = FC<{
  open: boolean;
  onClose?: MouseEventHandler<HTMLDivElement>;
  onCreationFinish?: (success: boolean, message: string) => any;
}>;

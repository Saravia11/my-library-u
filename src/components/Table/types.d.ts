import { FC } from "react";
import { TableTypeMap, TableProps } from "@mui/material";

export type TableProps<T> = {
  TableProps?: TableProps;
  content?: TableContent<T>;
};

export type Column<T> = {
  header: string;
  render: (item: T) => any;
};

export type TableContent<T> = {
  columns: Column<T>[];
  data: T[];
};

import { FC, MouseEventHandler } from "react";
import { TableTypeMap, TableProps } from "@mui/material";

export type TableProps<T> = {
  TableProps?: TableProps;
  content?: TableContent<T>;
  actions?: Action<T>[];
  searchFields?: (keyof T | ((item: T) => any))[];
  onRowClick?: (item: T) => any;
};

export type Column<T> = {
  header: string;
  render: (item: T) => any;
};

export type TableContent<T> = {
  columns: Column<T>[];
  data: T[];
};

export type Action<T> = {
  label: string;
  onClick: (item: T) => any;
};

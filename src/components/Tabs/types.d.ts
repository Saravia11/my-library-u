import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";

export type TabsType = FC<{
  tabs: Tab[];
  ContentProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}>;

export type Tab = {
  buttonText: string;
  component: ReactNode;
};

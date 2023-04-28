import { MongoResponse } from "./general";

export type User = MongoResponse & {
  name: string;
  last_name: string;
  carnet: string;
  role: "admin" | "student";
};

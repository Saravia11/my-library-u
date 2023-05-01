import { MongoResponse } from "./general";

export type User = {
  _id: string;
  name: string;
  last_name: string;
  email: string;
  role: "librarian" | "student";
};

export type UserValues = Omit<User, "_id">;

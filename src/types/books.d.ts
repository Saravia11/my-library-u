export type Book = {
  _id: string;
  title: string;
  author: string;
  published_year: number;
  genre: Genre;
  stock: number;
};

export type BookValues = Omit<Book, "_id" | "genre"> & { genre: string };

export type Genre = {
  _id: string;
  name: string;
};

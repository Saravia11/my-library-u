export type Book = {
  _id: string;
  title: string;
  author: string;
  published_year: number;
  genre: Genre;
};

export type BookValues = Omit<Book, "_id">;

export type Genre = {
  _id: string;
  name: string;
};

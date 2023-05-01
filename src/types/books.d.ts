export type Book = {
  _id: string;
  title: string;
  author: string;
  published_year: number;
  genre: Genre;
};

export type BookValues = Modify<Omit<Book, "_id">, { genre: string }>;

export type Genre = {
  _id: string;
  name: string;
};

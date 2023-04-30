export type Book = {
  _id: string;
  title: string;
  author: string;
  published_year: number;
  genre: string;
};

export type BookValues = Omit<Book, "_id">;

export type Genres = {
  _id: string;
  name: string;
};

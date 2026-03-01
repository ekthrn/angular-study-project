export type Book = {
  id: number,
  title: string,
  info: string,
  author: string,
  year: number,
  genre: string[],
  rating: number,
  coverUrl?: string,
} | null;



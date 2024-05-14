import { User } from "../user/userTypes";

export interface Book {
  _id: string;
  title: string;
  description: String;
  author: User;
  genre: string;
  coverImage: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
}

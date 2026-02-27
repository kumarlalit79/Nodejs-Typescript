import mongoose from "mongoose";

interface IBook {
  name: string;
  author: string;
  publishYear: number;
  description: string;
}

const bookSchema = new mongoose.Schema<IBook>({
  name: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  publishYear: { type: Number, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

const Book = mongoose.model<IBook>("Book", bookSchema);
export default Book;
export type { IBook };

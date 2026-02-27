import mongoose from "mongoose";
interface IBook {
    name: string;
    author: string;
    publishYear: number;
    description: string;
}
declare const Book: mongoose.Model<IBook, {}, {}, {}, mongoose.Document<unknown, {}, IBook, {}, mongoose.DefaultSchemaOptions> & IBook & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IBook>;
export default Book;
export type { IBook };
//# sourceMappingURL=Books.d.ts.map
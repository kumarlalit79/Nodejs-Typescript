import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    publishYear: { type: Number, required: true, trim: true },
    description: { type: String, required: true, trim: true },
});
const Book = mongoose.model("Book", bookSchema);
export default Book;
//# sourceMappingURL=Books.js.map
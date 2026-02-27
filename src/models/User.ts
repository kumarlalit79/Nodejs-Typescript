import mongoose from "mongoose";

interface IUser {
  name: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  booksAdded?: string[];
  roles: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  phoneNumber: { type: String, trim: true, required: true },
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  booksAdded: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  roles: { type: String, enum: ["creator", "visitor", "admin"] },
});

const User = mongoose.model<IUser>("User", userSchema);

export type { IUser };
export default User;

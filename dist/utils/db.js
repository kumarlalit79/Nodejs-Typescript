import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in environment");
        }
        await mongoose.connect(uri);
        console.log("Connection to DB established");
    }
    catch (error) {
        console.log("Error connecting to DB", error.message);
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map
import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectToDatabase = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log("connected to host", connectionInstance.connection.host);
    } catch (error) {
        console.log("error while connecting to db", error);
        process.exit(1);
    }
};

export default connectToDatabase;

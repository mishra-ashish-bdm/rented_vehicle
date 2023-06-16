import mongoose from "mongoose";
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewURlParser: true,
            useUnifiedTopology: true,
        });
        console.log("mongoDB connected");
    } catch (error) {
        console.log(`ERROR:${error.message}`)
        process.exit
    }
}

export default connectDB

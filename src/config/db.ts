import mongoose from "mongoose";
import colors from 'colors';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log(colors.cyan.italic.bold('MongoDB conectado exitosamente!'));
    } catch (error) {
        console.log(error);
    }
}
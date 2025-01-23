import { Document, Schema, model } from "mongoose";

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    verified: boolean;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    verified: {
        type: Boolean,
        default: false,
        required: true,
    }
})

export const User = model<IUser>('User', userSchema);
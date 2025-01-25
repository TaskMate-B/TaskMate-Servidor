import { Document, PopulatedDoc, Schema, Types, model } from "mongoose";
import { IUser } from "./User.model";

export interface IProject extends Document{
    title: string;
    client: string
    description: string;
    manager: PopulatedDoc<IUser & Document>;
}

const projectSchema = new Schema<IProject>({
    title: {
        type: String,
        required: true,
    },

    client: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    manager: {
        type: Types.ObjectId,
        ref: 'User',
    }
}, {timestamps: true});

export const Project = model<IProject>('Project', projectSchema);

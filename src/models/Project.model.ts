import { Document, Schema, model } from "mongoose";

interface IProject extends Document{
    title: string;
    client: string
    description: string;
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
}, {timestamps: true});

export const Project = model<IProject>('Project', projectSchema);

import { Document, PopulatedDoc, Schema, Types, model } from "mongoose";
import { IUser } from "./User.model";
import { ITask } from "./Task.model";

export interface IProject extends Document{
    title: string;
    client: string
    description: string;
    status: boolean;
    manager: PopulatedDoc<IUser & Document>;
    tasks: PopulatedDoc<ITask & Document>[];
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

    status: {
        type: Boolean,
        default: true,
        required: true,
    },

    manager: {
        type: Types.ObjectId,
        ref: 'User',
    },

    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task',
        }
    ]
}, {timestamps: true});

export const Project = model<IProject>('Project', projectSchema);

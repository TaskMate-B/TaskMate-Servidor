import { Document, PopulatedDoc, Schema, Types, model } from "mongoose";
import { IProject } from "./Project.model";

enum TaskStatus {
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    UNDER_REVIEW = 'Under Review',
    COMPLETED = 'Completed',
}

export interface ITask extends Document {
    title: string;
    status: TaskStatus,
    description: string;
    project: PopulatedDoc<IProject & Document>;
}

const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: TaskStatus,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    project: {
        type: Types.ObjectId,
        ref: 'Project',
    }
}, {timestamps: true});

export const Task = model('Task', taskSchema);
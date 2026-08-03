import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subTitle: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        spanSize: {
            type: String,
            default: "normal"
        },
        isActive: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    {
        timestamps: true,
    }
);

const Project = models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
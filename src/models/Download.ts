import mongoose, { Schema, models } from "mongoose";

const DownloadSchema = new Schema(
    {
        brochure_name: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Download = models.Download || mongoose.model("Download", DownloadSchema);

export default Download;
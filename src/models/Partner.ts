import mongoose, { Schema, models } from "mongoose";

const PartnerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
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

const Partner = models.Partner || mongoose.model("Partner", PartnerSchema);

export default Partner;
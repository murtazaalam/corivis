import mongoose, { Schema, models } from "mongoose";

const ServiceSchema = new Schema(
    {
        slug: {
            type: String,
            required: true,
        },
        tab_icon: {
            type: String,
            required: true,
        },
        tab_label: {
            type: String,
            required: true,
        },
        badges: { type: Array },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        brochure_href: {
            type: String,
            required: true,
        },
        image_src: {
            type: String,
            required: true,
        },
        image_caption: {
            type: String
        },
        btn_color: {
            type: String,
            required: true
        },
        card_bg_color: {
            type: String,
            required: true
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

const Service = models.Service || mongoose.model("Service", ServiceSchema);

export default Service;
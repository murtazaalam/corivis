import mongoose, { Schema, models } from "mongoose";

const TestimonialSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        quote: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        image: {
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

const Testimonial = models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

export default Testimonial;
import mongoose, { Schema, models } from "mongoose";

const ConsultationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        contact_no: {
            type: String
        },

        company_name: {
            type: String
        },

        services: {
            type: Array,
            required: true,
        },

        budget: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Consultation = models.Consultation || mongoose.model("Consultation", ConsultationSchema);

export default Consultation;
import { connectDB } from "@/lib/mongodb";
import Consultation from "@/models/Consultation";
import type { NextApiRequest, NextApiResponse } from "next";
import { consultationValidator } from "@/validators/consultationValidator";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    const status = consultationValidator(req.body);

    if (!status.isValid) {
        return res.status(400).json({
            success: false,
            message: status.message,
        });
    }

    try {
        await connectDB();

        const consultation = await Consultation.create({ ...req.body });

        return res.status(201).json({
            success: true,
            message: "Consultation submitted successfully",
            data: consultation,
        });
    } catch (error) {
        console.error("Consultation API error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
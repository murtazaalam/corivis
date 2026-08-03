import Contact from "@/models/Contact";
import { connectDB } from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { contactValidator } from "@/validators/contactValidator";

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

    const status = contactValidator(req.body);

    if (!status.isValid) {
        return res.status(400).json({
            success: false,
            message: status.message,
        });
    }

    try {
        await connectDB();

        const contact = await Contact.create({ ...req.body });

        return res.status(201).json({
            success: true,
            message: "Contact submitted successfully",
            data: contact,
        });
    } catch (error) {
        console.error("Contact API error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
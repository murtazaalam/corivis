import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        await connectDB();

        const limit = req.query.limit ? Number(req.query.limit) : undefined;

        // const testimonial = await Testimonial.find({
        //     isActive: true,
        // }).sort({ createdAt: -1 }).limit(limit).lean();

        const query = Testimonial.find({ isActive: true }).sort({ createdAt: -1 });

        if (limit) {
            query.limit(limit);
        }

        const testimonial = await query.lean();

        const totalCount = await Testimonial.countDocuments({ isActive: true });

        return res.status(200).json({
            success: true,
            message: "Testimonial fetched successfully",
            data: testimonial,
            limit,
            totalCount
        });
    } catch (error) {
        console.error("Get services error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch services",
        });
    }
}
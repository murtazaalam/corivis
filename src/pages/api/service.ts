import Service from "@/models/Service";
import { connectDB } from "@/lib/mongodb";
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

        const limit = req.query.limit ? Number(req.query.limit) : 10;
        const service = await Service.find({
            isActive: true,
        }).sort({ createdAt: -1 }).limit(limit).lean();
        const totalCount = await Service.countDocuments({ isActive: true });

        return res.status(200).json({
            success: true,
            message: "Service fetched successfully",
            data: service,
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
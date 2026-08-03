import mongoose from "mongoose";

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGO_URL;
if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = (global as typeof globalThis & {
    mongoose?: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}).mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    };
}

export async function connectDB() {
    if (cached?.conn) {
        return cached.conn;
    }

    if (!cached?.promise) {
        cached!.promise = mongoose.connect(MONGODB_URI!);
    }

    try {
        cached!.conn = await cached!.promise;

        console.log("MongoDB connected successfully!");
        console.log("Database name:", mongoose.connection.name);
        console.log("Host:", mongoose.connection.host);

        return cached!.conn;
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}
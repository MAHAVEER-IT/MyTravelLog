import { connectDB } from "@/lib/mongoose";
import { Place } from "@/Models/Place";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const response = await Place.find({}).limit(5);
    return NextResponse.json({ response });
}
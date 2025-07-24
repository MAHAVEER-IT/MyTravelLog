import { connectDB } from "@/lib/mongoose";
import { Place } from "@/Models/Place";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB();
    const data = await request.json();
    const respose = await Place.create(data);
    return NextResponse.json({ respose });
}

export async function GET() {
    await connectDB();
    const response = await Place.find();
    return NextResponse.json({ response });
}

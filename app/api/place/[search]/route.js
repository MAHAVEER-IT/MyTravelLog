import mongoose from "mongoose";
import { connectDB } from "@/lib/mongoose";
import { Place } from "@/Models/Place";
import { NextResponse } from "next/server";

export async function GET(req,{ params }) {
    await connectDB();
    const { search } = await params;
    const response = await Place.find({
        $or: [
            { id : { $regex: search, $options: 'i' } },
            { placeName: { $regex: search, $options: 'i' } },
            { nearBy: { $regex: search, $options: 'i' } },
            { labels: { $regex: search, $options: 'i' } },
            { about: { $regex: search, $options: 'i' } },
            { BestTime: { $regex: search, $options: 'i' } },
        ]
    });

    return NextResponse.json({response});
}


export async function PATCH(req,{params}) {
    await connectDB();
    const {search} = await params;
    const body = await req.json();
    const response = await Place.findOneAndUpdate({id:search},body,{new:true});
    return NextResponse.json({response});
}

export async function DELETE(req,{params}) {
    await connectDB();
    const {search} = await params;
    const response = await Place.findOneAndDelete({id:search});
    return NextResponse.json({"deleted":"success",response})
}
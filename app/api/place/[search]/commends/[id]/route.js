import { Place } from "@/Models/Place";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req,{params}) {
    await connectDB();
    const {id} = await params;
    const {name,comment} = await req.json();
    const response = await Place.findOneAndUpdate({id},{$push:{comments:{name,comment}}},{new:true})
    return NextResponse.json({response});
}
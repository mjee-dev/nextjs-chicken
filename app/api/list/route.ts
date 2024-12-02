import connectToDatabase from "@/app/lib/mongodb";
//import { NextResponse } from "next/server";
import List from "../models/list";

export async function GET() {
    try {
        // const client = await connectToDatabase();
        // const db = client.db('tests');
        // const result = await db.collection('post').find().toArray();
        // console.log(`receive route.ts GET`);
        // return NextResponse.json(result, {status: 201});

        await connectToDatabase();
        const boardList = await List.find();
        return Response.json({ data: boardList });
    } catch (error) {
        console.error(`Error : ${error}`);
        //return NextResponse.json({ message: 'Failed to load data'}, {status: 500});
        return Response.error();
    }
}
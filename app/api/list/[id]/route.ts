import { NextRequest, NextResponse } from "next/server";
//import List from "../../models/list";
import { getDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// https://typescript-eslint.io/rules/no-unused-vars
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;    // parmas 값 비동기로 접근
    
    const dbName = process.env.DB_NAME_CHICKEN;
    const collectionName = process.env.COLLECTION_NAME;
    
    try {
        const db = await getDatabase(dbName as string);
        const collection = db.collection(collectionName as string);
        
        const boardDetail = await collection.findOne({ _id: new ObjectId(id)});

        if (!boardDetail) {
            return NextResponse.json(
                { success: false, error: " ⚠ Not Found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, data: boardDetail }, { status: 200 });
    } catch (error) {
        console.error(`Error fetching detail: ${error}`);
        return NextResponse.json({
            success: false,
            error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
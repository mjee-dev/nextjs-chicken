import { getDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;

    console.log(`🟡🟡 Stores GET ID => ${id}`);
    
    const dbName = process.env.DB_NAME_CHICKEN;
    const collectionName = process.env.COLLECTION_STORES;
    
    try {
        const db = await getDatabase(dbName as string);
        const collection = db.collection(collectionName as string);
    
        const storeDetail = await collection.findOne({ _id: new ObjectId(id)})
    
        if (!storeDetail) {
            return NextResponse.json({
                success: false,
                error: "⚠ Not Found"
            }, { status: 404 })
        }
        
        return NextResponse.json({
            success: true,
            data: storeDetail
        }, { status: 200 });
    } catch (error) {
        console.error(`Error fetching Store detail => ${error}`);
        return NextResponse.json({
            success: false,
            error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
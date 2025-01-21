import { connectToDatabase } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    if (request.method !== 'GET') {
        console.log('Method not allowd');
        return NextResponse.json({
            error: `Method not allowd`
        }, {
            status: 405
        });
    }

    const dbName = process.env.DB_NAME_CHICKEN;
    const collectionName = process.env.COLLECTION_STORES;

    if (!dbName || !collectionName) {
        return NextResponse.json(
            { error: `Missing query parameters` },
            { status: 400});
    }

    try {
        const db = await connectToDatabase(dbName);
        const collection = db.collection(collectionName as string);

        // 데이터 조회
        const data = await collection.find({}).toArray();
        return NextResponse.json({
            success: true,
            data
        }, { status: 200 });
    } catch (error) {
        console.error(`Error => ${error}`);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch data from the server"
        }, { status: 500 });
    }
}
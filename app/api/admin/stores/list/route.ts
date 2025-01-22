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

        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '5', 10);
        const skip = (page - 1) * limit;

        // 데이터 조회
        const data = await collection.find({}).skip(skip).limit(limit).toArray();
        const total = await collection.countDocuments();
        const totalPages = Math.ceil(total / limit);

        console.log(`total => ${total}, totalPages => ${totalPages}, skip => ${skip}, limit => ${limit}`);

        return NextResponse.json({
            success: true,
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        }, { status: 200 });
    } catch (error) {
        console.error(`Error => ${error}`);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch data from the server"
        }, { status: 500 });
    }
}
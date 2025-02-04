import { connectToDatabase } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const query = url.searchParams.get("q") || "";
    
        const db = await connectToDatabase(process.env.DB_NAME_CHICKEN as string);
        const collection = db.collection(process.env.COLLECTION_STORES as string);

        console.log(`💥 query => ${query}`);
    
        let condition = [
            {
                $match: {
                    $or: [
                        { name: { $regex: query, $options: "i"} },
                        { location: {
                            address: { $regex: query, $options: "i"} }
                        }
                    ],
                },
            },
            { $sort: { searchCount: -1} },    // -1: 내림차순, 1:오름차순
            { $limit: 10 }
        ];
        const data = await collection.aggregate(condition).toArray();

        // 검색한 데이터 searchCount++
        const up = await collection.updateMany({
            $or: [
                    { name: { $regex: query, $options: "i"} },
                    { location: {
                        address: { $regex: query, $options: "i"} }
                    }
                ]
            },
            {
                $inc: { searchCount: 1}
            }
        );

        console.log(`💥 검색 결과 => ${JSON.stringify(data)}`);
        console.log(`💥 Up 결과 => ${JSON.stringify(data)}`);
    
        return NextResponse.json({
            success: true,
            data, 
        }, { status: 200 });
    } catch (error) {
        console.error(`🚨 Error => ${JSON.stringify(error)}`);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch data from the server"
        }, { status: 500 });
    }
}

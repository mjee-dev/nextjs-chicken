
import { NextRequest } from "next/server";
import { getDatabase } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

/** 컬렉션명으로 데이터 가져오는 방법 */
// 데이터 중심 페이지는 일반적으로 서버 컴포넌트를 사용
//import List from "../models/list";
//import { NextApiRequest, NextApiResponse } from "next";
//import connectToDatabase from "@/app/lib/mongodb";

/* export async function GET() {
    try {
        await connectToDatabase();  // MongoDB 연결
        const boardList = await List.find();    // 데이터베이스에서 데이터 가져오기
        return new Response(
            JSON.stringify({ data : boardList }),
            { status : 200, headers: { "Conetnt-Type" : "application/json"}}
        );
    } catch (error) {
        console.error(`Error fetching data : ${error}`);
        //return NextResponse.json({ message: 'Failed to load data'}, {status: 500});
        return new Response(
            JSON.stringify( `${error} : Failed to load data`),
            { status : 500, headers: { "Content-Type" : "application/json"}}
        );
    }
} */

 /** 데이터베이스명, 컬렉션명으로 데이터 가져오는 방법 */

 export async function GET(request: NextRequest) {
    if (request.method !== 'GET') {
        console.log(`Method not allowed`);
        return NextResponse.json({ error : `Method not allowed` }, { status: 405});
    }

    const dbName = process.env.DB_NAME_CHICKEN;
    const collectionName = process.env.COLLECTION_NAME;

    if (!dbName || !collectionName) {
        return NextResponse.json(
            { success: false, error: "Missing required query parameters" },
            { status: 400 }
        );
    }

    if (!dbName || !collectionName) {
        return NextResponse.json(
            { error: `Missing query parameters` },
            { status: 400});
    } 

    try {
        const db = await getDatabase(dbName as string);
        const collection = db.collection(collectionName as string);

        // 데이터 조회 예제
        const data = await collection.find({}).toArray();    //.find({}).limit(10).
        return NextResponse.json({ success: true, data }, { status : 200 });

    } catch (error) {
        console.error(`Error => ${error}`);
        return NextResponse.json({ success: false, error: "Failed to fetch data from the server" }, { status: 500 });
    } 
    // finally {
    //     // 연결 유지 설정이 아닌 경우 클라이언트 닫기
    //     // await client.close()
    // }
 }
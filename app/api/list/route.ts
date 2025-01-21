
import { NextRequest } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
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
    const collectionName = process.env.COLLECTION_BOARD;

    if (!dbName || !collectionName) {
        return NextResponse.json(
            { error: `Missing query parameters` },
            { status: 400});
    } 

    try {
        const db = await connectToDatabase(dbName);
        const collection = db.collection(collectionName as string);

        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);     // 기본값 1.  10진수로 변환
        const limit = parseInt(url.searchParams.get('limit') || '5', 10);

        const skip = (page - 1) * limit;    // `skip`: MongoDB에서 건너뛸 문서 수

        // 데이터 조회
        const data = await collection.find({}).skip(skip).limit(limit).toArray();    //.find({}).limit(10).
        const total = await collection.countDocuments();    // `countDocuments`: 컬렉션의 총 문서 수 반환
        const totalPages = Math.ceil(total / limit);    // 총 문서 수를 `limit`으로 나누어서 페이지 수 계산

        console.log(`total => ${total}, totalPages => ${totalPages}, skip => ${skip}, limit => ${limit}`);

        return NextResponse.json({
            success: true,
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            }
        }, { status : 200 });

    } catch (error) {
        console.error(`Error => ${error}`);
        return NextResponse.json({ success: false, error: "Failed to fetch data from the server" }, { status: 500 });
    } 
    // finally {
    //     // 연결 유지 설정이 아닌 경우 클라이언트 닫기
    //     // await client.close()
    // }
 }
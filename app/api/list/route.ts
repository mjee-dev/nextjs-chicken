import connectToDatabase from "@/app/lib/mongodb";
//import { NextResponse } from "next/server";
import List from "../models/list";

// 데이터 중심 페이지는 일반적으로 서버 컴포넌트를 사용
export async function GET() {
    try {
        // const client = await connectToDatabase();
        // const db = client.db('tests');
        // const result = await db.collection('post').find().toArray();
        // console.log(`receive route.ts GET`);
        // return NextResponse.json(result, {status: 201});

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
}
//import connectToDatabase from '@/app/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { BoardType } from '../models/list';
import { connectToDatabase } from '@/app/lib/mongodb';

/** MongoDB Database명, colletion명 동적 연결 */
export async function POST(request: NextRequest) {
  try {
    // 요청 데이터 파싱
    const data: BoardType = await request.json();
    //const body = await request.json();
    
    // 클라이언트에서 보낸 데이터 출력
    console.log('Write Server Received data:', data);

    // MongoDB 연결
    const dbName = process.env.DB_NAME_CHICKEN;
    const collectionName = process.env.COLLECTION_BOARD;

    const db = await connectToDatabase(dbName as string);
    const collection = db.collection(collectionName as string);
    
    const { title, content } = data;
    // 필수 필드 확인
    if (!title || !content) {
        return NextResponse.json({ error : 'Missing required fields'}, { status : 400});
    }

     // 게시글 생성 및 저장
     const result = collection.insertOne({
        title,
        content,
        createdAt: new Date(),
     })
 
     // 성공 응답
     return NextResponse.json(
       {
         message: "Post created successfully",
         postId: (await result).insertedId
       },
       { status: 201 }
     );
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'Failed to save data' }, { status: 500 });
  }
}

// app/api/example/route.ts

import { connectToDatabase } from '@/app/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

const TestSchema = new mongoose.Schema({
    title: String,
    content: String,
}, { timestamps: true});

const TestModel = mongoose.models.Test || mongoose.model('Test', TestSchema);

/** MongoDB Database명, colletion명 고정 연결 */
export async function POST(request: NextRequest) {
  try {
    const dbName = process.env.DB_NAME_CHICKEN;
    const collectionName = process.env.COLLECTION_BOARD;
    
    // MongoDB 연결
    const db = await connectToDatabase(dbName as string);
    const collection = db.collection(collectionName as string);

    // 요청 데이터 파싱
    const body = await request.json();
    
    // 클라이언트에서 보낸 데이터 출력
    console.log('Write Server Received data:', body);
    
    const { title, content } = body;
    if (!title || !content) {
        return NextResponse.json({ error : 'Missing required fields'}, { status : 400});
    }

    // 데이터 저장
    const newDocument = new TestModel({ title, content });
    const savedDocument = await newDocument.save();

    // 응답 반환
    // return NextResponse.json({ message: 'Data received successfully', data: body });
    console.log(`savedDocument => ${savedDocument}`);
    return NextResponse.json(savedDocument, {status : 201});
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'Failed to save data' }, { status: 500 });
  }
}

import { connectToDatabase } from '@/app/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { Users, UsersType } from '../models/user';

// 1. 사용자가 입력한 아이디 -> DB 에 계정 조회
// 2. 계정이 존재하는지 체크
// 2-1. 계정 존재하지 않다면 결과 리턴
// 2-2. 계정이 존재한다면 입력된 패스워드를 bcrypt.compare 함수로 패스워드를 비교하고 결과를 리턴

const bcrypt = require("bcrypt");

export async function POST(request: NextRequest) {
  try {
    // 요청 본문(body) 가져오기
    const body = await request.json();

    // 클라이언트에서 보낸 데이터 출력
    console.log('Login Server Received data:', body);

    const dbName = process.env.DB_NAME_CHICKEN;
    const collectionName = process.env.COLLECTION_USERS;

    console.log('@@@ Before connecting to database');

    const db = await connectToDatabase(dbName as string);
    const collection = db.collection(collectionName as string);

    console.log(`-- Database connected`);
    console.log(`-- Connected to databse: ${db.databaseName}`);

    console.log('## login/route.ts');
    const inputPassword: String = body.password;
    const userInfo: UsersType = await Users.findOne({ email: body.email}).exec();

    if (userInfo === null) {
      return Response.json({
        message: "계정이 존재하지 않습니다.",
        result: ""
      })
    }

    const isMatched: boolean = await bcrypt.compare(inputPassword, userInfo.password);

    const msg = isMatched ? 'OK' : '아이디 혹은 비밀번호를 확인해주세요.';
    
    return NextResponse.json({
      data: userInfo,
      message: msg
    });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}



import { connectToDatabase } from "@/app/lib/mongodb";
import user, { UsersType } from "../models/user";
import { NextRequest, NextResponse } from "next/server";

const bcrypt = require("bcrypt");

/**
 * Hash 횟수를 의미하며, 횟수가 높아질수록 보안은 좋아지지만 시간이 오래 걸릴 수 있습니다.
 * 공식문서에 나와있는 기본값을 사용합니다.
 */
const saltRounds = 10;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const data: UsersType = await request.json();

        // 클라이언트에서 보낸 데이터 출력
        console.log('Server Received data:', data);

        // MongoDB 연결
        const dbName = process.env.DB_NAME_CHICKEN;
        const collectionName = process.env.COLLECTION_USERS;

        const db = await connectToDatabase(dbName as string);
        const collection = db.collection(collectionName as string);

      //  console.log(`collection DB => ${JSON.stringify(collection.find())}`);

        const userPassword: String = data.password;
        const hashPassword: String = await bcrypt.hash(userPassword, saltRounds);

        const userInfo = new user({
            name: data.name,
            email: data.email,
            password: hashPassword
        });

        console.log(`### UserInfo => ${JSON.stringify(userInfo)}`);
        await userInfo.save();

        return NextResponse.json(
            { messeage: "회원가입에 성공했습니다." },
            { status: 201}
        );
        //return Response.json({ message: "회원가입에 성공했습니다." });
    } catch (error) {
        console.error(`회원가입 Error => ${JSON.stringify(error)}`);
        return NextResponse.json({ message: '회원가입에 실패했습니다.'});
    }
}
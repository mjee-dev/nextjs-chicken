

import { connectToDatabase } from "@/app/lib/mongodb";
import { Users, UsersType } from "../models/user";
import { NextRequest, NextResponse } from "next/server";

const bcrypt = require("bcrypt");

/**
 * Hash 횟수를 의미하며, 횟수가 높아질수록 보안은 좋아지지만 시간이 오래 걸릴 수 있습니다.
 * 공식문서에 나와있는 기본값을 사용합니다.
 */
const saltRounds = 10;

// eslint-disable-next-line @typescript-eslint/no-unused-vars

// 클라이언트 측에서 fetch를 사용하면, Response 객체가 반환
export async function POST(request: NextRequest) {
    try {
        const data: UsersType = await request.json();

        // 클라이언트에서 보낸 데이터 출력
        console.log('Server Received data:', data);

        // MongoDB 연결
        const dbName = process.env.DB_NAME_CHICKEN;
        const collectionName = process.env.COLLECTION_USERS;

        console.log('@@@ Before connecting to database, ');

        const db = await connectToDatabase(dbName as string);
        const collection = db.collection(collectionName as string);

        console.log('--- Database connected');
        console.log(`--- Connected to database: ${db.databaseName}`);

      //  console.log(`collection DB => ${JSON.stringify(collection.find())}`);

        const userPassword: String | null | undefined = data.password;
        const hashPassword: String = await bcrypt.hash(userPassword, saltRounds);

        // date 날짜 형식 변경
        const moment = require('moment');
        const date = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(`moment date => ${date}`);

        const isChecked: boolean = await Users.findOne({ email: data.email}).exec();
        if (isChecked !== null) {
            return NextResponse.json({ error: "이미 존재하는 계정입니다.", status: 400 });
        };

        const userInfo = new Users({
            name: data.name,
            email: data.email,
            password: hashPassword,
            createdAt: date,
            updatedAt: date
        });

        console.log(`### UserInfo => ${JSON.stringify(userInfo)}`);

        console.log('--- Before saving user info');
        const savedUser = await userInfo.save({
            writeConcern: {w: 'majority'}       // writeConcern 설정이 엄격한 경우, 실제로 데이터가 DB에 반영되기 전에 트랜잭션이 실패할 수 있음
        });
        console.log(`--- User Info saved: ${JSON.stringify(savedUser)}`);

        return NextResponse.json({ message: "회원가입 성공", status: 200 });
        //return Response.json({ message: "회원가입에 성공했습니다." });
    } catch (error) {
        console.error(`회원가입 Error: ${error}`);
        return NextResponse.json({ error: '회원가입에 실패하였습니다.',  status: 400 });
    }
}
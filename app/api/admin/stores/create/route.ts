import { Stores } from "@/app/api/models/store";
import { connectToDatabase } from "@/app/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const storeData = await request.json();
        console.log(`Store Creation Server Received Data: ${JSON.stringify(storeData)}`);
        
        const dbName = process.env.DB_NAME_CHICKEN;
        console.log('🟡 Before connecting to database 🟡');

        const db = await connectToDatabase(dbName as string);

        console.log(`🟠 Databse connected 🟠`);
        console.log(`🟠 Connected to databse: ${db.databaseName}🟠`);

        // 스키마 구조에 맞게 처리
        const { name, location, tel, searchCount, operateTime, imageUrl } = storeData;
        const { address, coordinates } = location;

        // date 날짜 형식 변경
        const moment = require('moment');
        const date = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(`moment date => ${date}`);

        const newStroe = new Stores({
            _id: new mongoose.Types.ObjectId(), // 수동으로 _id 설정
            name,
            location: {
                address,
                coordinates
            },
            tel,
            operateTime,
            searchCount,
            imageUrl,
            createdAt: date,
            updatedAt: null
        });

        console.log(`newStroe 데이터 => ${JSON.stringify(newStroe)}`);

        const savedStore = await newStroe.save();
        console.log(`savedStore 결과 => ${savedStore}`);

        return NextResponse.json({ message: "Store 등록 성공", status: 200 });

    } catch (error) {
        console.error(`Error handling request: ${error}`);
        return NextResponse.json({ error: '스토어 등록에 실패하였습니다.', status: 400 });
    }
}
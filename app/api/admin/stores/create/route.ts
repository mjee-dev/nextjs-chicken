import { Stores } from "@/app/api/models/store";
import { connectToDatabase } from "@/app/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const storeData = await request.json();
        console.log(`Store Creation Server Received Data: ${JSON.stringify(storeData)}`);
        
        const dbName = process.env.DB_NAME_CHICKEN;
        const collectionName = process.env.COLLECTION_STORES;

        console.log('🟡 Before connecting to database 🟡');

        const db = await connectToDatabase(dbName as string);
        const collection = db.collection(collectionName as string);

        console.log(`🟠 Databse connected 🟠`);
        console.log(`🟠 Connected to databse: ${db.databaseName}🟠`);

        // 스키마 구조에 맞게 처리
        const { name, location, tel, viewCount, operateTime } = storeData;
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
            viewCount,
            createdAt: date,
            updatedAt: null
        });

        console.log(`newStroe 데이터 => ${JSON.stringify(newStroe)}`);

        const savedStore = await newStroe.save();

        return NextResponse.json({ message: "Store 등록 성공", status: 200 });

    } catch (error) {
        console.error(`Error handling request: ${error}`);
        return NextResponse.json({ error: '"Store 등록에 실패하였습니다.', status: 400 });
    }
}
import { Stores } from "@/app/api/models/store";
import { connectToDatabase } from "@/app/lib/mongodb";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// `zod`로 요청 데이터 검증
const storeUpdateSchema = z.object({
  name: z.string().optional(),
  tel: z.string().optional(),
  operateTime: z.array(z.number()).length(2).optional(),
  imageUrl: z.string().optional(),
  location: z.object({
    address: z.string(),
    coordinates: z.array(z.number()).length(2)
  }).optional(),
});
// z.object():  객체 스키마 정의

export async function PATCH(request: NextRequest) {
  try {
    console.log(`🔥 /api/admin/stores/modify`);
    const updateData = await request.json();
    console.log(`Store update Server Received Data: ${JSON.stringify(updateData)}`);

    const dbName = process.env.DB_NAME_CHICKEN;
    console.log('🟡 Before connecting to database 🟡');

    const db = await connectToDatabase(dbName as string);

    console.log(`🟠 Databse connected 🟠`);
    console.log(`🟠 Connected to databse: ${db.databaseName}🟠`);

    // 스키마 구조에 맞게 처리
    const { _id, name, location, tel, operateTime, imageUrl } = updateData;
    const { address, coordinates } = location;

    // date 날짜
    const moment = require('moment');
    const date = moment().format('YYYY-MM-DD HH:mm:ss');

    const store = {
      name,
      location: {
        address,
        coordinates
      },
      tel,
      operateTime,
      imageUrl,
      updatedAt: date
    };

    console.log(`updateStroe 데이터 => ${JSON.stringify(store)}`);
    
    // 데이터 검증
    const parseData = storeUpdateSchema.safeParse(store);
    console.log(`🌞 데이터 검증 parseData => ${JSON.stringify(parseData)}`);
  
    if (!parseData.success) {
      return NextResponse.json({
        message: "🚨 잘못된 입력값",
        error: parseData.error
      }, { status: 400});
    }

    // `new: true`: 업데이트 후 수정된 데이터를 반환 (false: 업데이트 전의 데이터 반환)
    const updatedStore = await Stores.findByIdAndUpdate(_id, parseData.data, { new: true});

    console.log(`🌞 업데이트할 스토어 => ${updatedStore}`);

    // 스토어가 없을 경우
    if (!updatedStore) {
      return NextResponse.json({
        success: false,
        message: "🚨 스토어를 찾을 수 없음",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "스토어 정보가 업데이트되었습니다.",
    }, { status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
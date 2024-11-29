// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 요청 본문(body) 가져오기
    const body = await request.json();

    // 클라이언트에서 보낸 데이터 출력
    console.log('Write Server Received data:', body);

    // 응답 반환
    return NextResponse.json({ message: 'Data received successfully', data: body });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}

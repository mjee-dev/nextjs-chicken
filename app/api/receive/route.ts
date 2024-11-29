import { NextResponse } from "next/server";

export async function GET() {
    console.log(`receive route.ts GET`);
    return NextResponse.json({message: 'Hello from the API!'});
}
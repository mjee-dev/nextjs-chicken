import { NextRequest, NextResponse } from "next/server";
import { ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(request: NextRequest, response: NextResponse) {
    // if (request.method === 'POST') {
    //     const contentType = request.headers['Content-type'];
    //     if (contentType && contentType.startsWith('multipart/from-data')) {
    //         return NextResponse.json({ message: 'Multipart form-data received'}, { status: 200 });
    //     } else {
    //         return NextResponse.json({ message: 'Not multipart/form-data'}, { status: 400 });
    //     }
    // }

    try {
        const formData = await request.formData();
        const file = formData.get('file');

        console.log(`🔥 업로드 data => ${JSON.stringify(file)}`);
        

        if (!file) {
            return NextResponse.json({
                error: '파일이 없습니다.',
                status: 400
            });
        } else if (!(file instanceof Blob)) {
            return NextResponse.json({
                error: '유효한 파일이 아닙니다.',
                status: 400
            });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const fileName = `${randomUUID()}-${file.name}`;
        const params = {
            Bucket: process.env.AMPLIFY_BUCKET,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
        //    ACL: ObjectCannedACL.public_read
        };

        console.log(`🔥 업로드할 params => ${JSON.stringify(params)}`);

        const send = await s3.send(new PutObjectCommand(params));
        console.log(`🔥 업로드 send 결과 => ${send}`);
        const imageUrl = `https://${process.env.AMPLIFY_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
        console.log(`🔥 imageUrl: ${imageUrl}`);

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error(`업로드 Error => ${error}`);
        return NextResponse.json({
            success: false,
            error: "파일 업로드 실패"
        }, { status: 500 });
    }
}
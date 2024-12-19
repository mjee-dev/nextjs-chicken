
import connectToDatabase from "@/app/lib/mongodb";
import user, { UsersType } from "../models/user";

const bcrypt = require("bcrypt");

/**
 * Hash 횟수를 의미하며, 횟수가 높아질수록 보안은 좋아지지만 시간이 오래 걸릴 수 있습니다.
 * 공식문서에 나와있는 기본값을 사용합니다.
 */
const saltRounds = 10;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request, response: Response) {
    try {
        await connectToDatabase('chicken');
        
        const data: UsersType = await request.json();
        const userPassword: string = data.password;
        const hashPassword: string = await bcrypt.hash(userPassword, saltRounds);

        const userInfo = new user({
            name: data.name,
            email: data.email,
            password: hashPassword
        });

        await userInfo.save();

        return Response.json({ message: "회원가입에 성공했습니다." });
    } catch (error) {
        return Response.error();
        console.error(`회원가입 Error => ${JSON.stringify(error)}`);
    }
}
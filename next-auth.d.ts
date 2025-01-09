import NextAuth from "next-auth";
import { User as NextAuthUser } from "next-auth";

// User 타입 확장
declare module "next-auth" {
  interface User extends NextAuthUser {
    password?: string; // 비밀번호를 선택적으로 추가
  }
}

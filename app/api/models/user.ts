import mongoose, { InferSchemaType, Schema } from "mongoose";

// 스키마에서 컬렉션 이름 동적으로 설정
const collectionName = process.env.COLLECTION_USERS || "users";

const UsersSchema = new Schema({
    _id: { type: String, required: true },
    name : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, required: true },
}, {
    collection: collectionName,   // 저장될 컬렉션 이름 명시
    timestamps: true,             // createdAt, updatedAt 자동 추가
});

type UsersType = InferSchemaType<typeof UsersSchema>;

export default mongoose.models.Users || mongoose.model("Users", UsersSchema);
export type { UsersType };
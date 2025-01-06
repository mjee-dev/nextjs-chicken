import mongoose, { InferSchemaType, model, models, Schema } from "mongoose";

// 스키마에서 컬렉션 이름 동적으로 설정
const collectionName = process.env.COLLECTION_USERS || "users";

// '_id' 값은 MongoDB가 자동으로 '_id'를 생성하므로, 스키마에서 '_id'를 필수로 설정하지 않아야함
const UsersSchema = new Schema({
    name : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, required: true },
}, {
    collection: collectionName,   // 저장될 컬렉션 이름 명시
    timestamps: true,             // createdAt, updatedAt 자동 추가
});

type UsersType = InferSchemaType<typeof UsersSchema>;

export const Users = models.Users || model("Users", UsersSchema);
export type { UsersType };
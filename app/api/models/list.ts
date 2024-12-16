import mongoose, { InferSchemaType, Schema } from "mongoose";

const TestSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: String, default: null }, // 기본값 null로 설정
  updatedAt: { type: Date, default: Date.now } // 기본값 현재 시간
});

// 타입 추론
type ListType = InferSchemaType<typeof TestSchema>;

// 조건부 모델 정의
export default mongoose.models.Test || mongoose.model("Test", TestSchema);
export type { ListType };

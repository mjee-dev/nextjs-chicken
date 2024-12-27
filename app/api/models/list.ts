import { InferSchemaType, model, models, Schema } from "mongoose";

const BoardSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: String, default: null }, // 기본값 null로 설정
    updatedAt: { type: Date, default: Date.now }, // 기본값 현재 시간
  },
  { collection: 'board' } // 컬렉션명 설정
);

// 타입 추론
type BoardType = InferSchemaType<typeof BoardSchema>;

// 조건부 모델 정의
export const Board = models.Board || model('Board', BoardSchema);
export type { BoardType };

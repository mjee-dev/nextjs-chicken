import { InferSchemaType, model, models, Schema } from "mongoose";

const collectionName = process.env.COLLECTION_BOARD || "board";

const BoardSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: null }, // 기본값 null
  },
  { collection: collectionName } // 컬렉션명 설정
);

// 타입 추론
type BoardType = InferSchemaType<typeof BoardSchema>;

// 조건부 모델 정의
export const Board = models.Board || model('Board', BoardSchema);
export type { BoardType };

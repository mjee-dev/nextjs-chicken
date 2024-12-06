import mongoose, { InferSchemaType, Schema } from "mongoose";

const TestSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    content: String,
    createdAt: Date,
    updatedAt: Date
  });
  
  // 타입 추론
  type ListType = InferSchemaType<typeof TestSchema>;
  
  // 조건부 모델 정의
  export default mongoose.models.Test || mongoose.model("Test", TestSchema);
  export type { ListType };
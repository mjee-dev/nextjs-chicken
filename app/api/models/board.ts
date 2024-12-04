import mongoose, { InferSchemaType, Schema } from "mongoose";

const TestSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    content: String,
    createdAt: Date,
    updatedAt: Date
  });
  
type BoardType = InferSchemaType<typeof TestSchema>;
  
 export default mongoose.models.List || mongoose.model("Test", TestSchema);
 export type { BoardType };
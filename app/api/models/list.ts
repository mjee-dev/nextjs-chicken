import mongoose, { InferSchemaType, Schema } from "mongoose";

const TestSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    content: String,
    createdAt: Date,
    updatedAt: Date
  });
  
  type ListType = InferSchemaType<typeof TestSchema>;
  
  export default mongoose.models.Planets || mongoose.model("Test", TestSchema);
  export type { ListType };
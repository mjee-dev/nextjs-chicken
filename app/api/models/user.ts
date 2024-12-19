import mongoose, { InferSchemaType, Schema } from "mongoose";

const UsersSchema = new Schema({
    _id: { type: String, required: true },
    name : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, required: true },
    createdAt : { type : Date, default: Date.now },
});

type UsersType = InferSchemaType<typeof UsersSchema>;

export default mongoose.models.Users || mongoose.model("Users", UsersSchema);
export type { UsersType };
import { InferSchemaType, model, models, Schema } from "mongoose";

const collectionName = process.env.COLLECTION_STORES || "stores";

const StoresSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    location: {
        address: { type: String, required: true },
        coordinates: { type: [Number], require: true } // 위도,경도 coordinates[0]
    },
    tel: { type: String, required: true },
    operateTime: { type: [Number], require: true }, // [900, 2100] 9:00 AM - 9.00 PM
    viewCount: { type: Number, required: true, default: 0 },
    createdAt: {
        type: String,
        default: Date.now
    },
    updatedAt: {
        type: String,
        default: Date.now
    }
}, {
    collection: collectionName
});

type StoresType = InferSchemaType<typeof StoresSchema>;

// 기존 모델이 존재하면 사용하고 없으면 생성
export const Stores = models.Stores || model("Stores", StoresSchema);
export type { StoresType };
     
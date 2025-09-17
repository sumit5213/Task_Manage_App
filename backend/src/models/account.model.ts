import mongoose, { Document, Schema } from "mongoose";
import { ProviderEnum, ProviderEnumType } from "../enums/account-provider.enum";

export interface AccountDocument extends Document {
    provider: ProviderEnumType
    providerId: string
    userId: mongoose.Types.ObjectId
    refreshToken: string | null;
    tokenExpiry: string | null;
    createdAt: Date;
} 
 
// @ts-ignore   
const accountSchema = new mongoose.Schema<AccountDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    provider: {
        type: String,
        enum: ProviderEnum,
        required: true,
    },
    providerId: {
        type: String,
        required: true,
        unique: true
    },
    refreshToken: { type: String, default: null },
    tokenExpiry: { type: String, default: null }

}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret: Record<string, any>) {
            delete ret.refreshToken
        }
    }
})

const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema)
export default AccountModel
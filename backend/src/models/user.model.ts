import mongoose, { Date, Document, Schema } from "mongoose"
import { compareValue, hashValue } from "../utils/bcrypt";


export interface UserDocument extends Document {
    name: string;
    email: string;
    password?: string;
    comparePassword(value: string): Promise<boolean>;
    pictureProfile: string;
    currentWorkSpace: mongoose.Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    lastLogin: Date;
    omitPassword(): Omit<UserDocument, "password">;
} 
// @ts-ignore   
const userSchema = new mongoose.Schema<UserDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            select: true,
        },
        pictureProfile: {
            type: String,
            default: null,
        },
        currentWorkSpace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
            default: true,
        }
    }, { timestamps: true }
);


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        if (this.password) {
            return await hashValue(this.password)
        }
    }
    next();
});


userSchema.methods.omitPassword = function (): Omit<UserDocument, "password"> {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;

}


userSchema.methods.comparePassword = async function (value: string) {
    return compareValue(value, this.password);
};


const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
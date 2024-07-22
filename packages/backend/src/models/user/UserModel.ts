import mongoose, { Document, Model, Schema, CallbackError } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    roles: string[];
    _profileId: string;

    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    username: {type: String, lowercase: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isVerified: {type: Boolean, default: false},
    roles: {type: [String], default: ['user']},
    _profileId: { type: String, ref: 'UserProfile' },
}, {
    timestamps: true
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err as CallbackError);
    }
})

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

//type UserDocument = mongoose.InferSchemaType<typeof UserSchema>;
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
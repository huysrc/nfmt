import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUserProfile extends Document {
    avatarUrl: string;
    firstName: string;
    lastName: string;
}

const UserProfileSchema = new Schema<IUserProfile>({
    avatarUrl: String,
    firstName: String,
    lastName: String,
});

//type UserProfileDocument = mongoose.InferSchemaType<typeof UserProfileSchema>;
const UserProfile : Model<IUserProfile> = mongoose.models.UserProfile || mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);
export default UserProfile;

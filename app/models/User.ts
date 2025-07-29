import mongoose, { Schema, Document } from 'mongoose'

/**
 * Define the TypeScript interface for the User document
 */
export interface User extends Document {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Define the schema for MongoDB
 */
const UserSchema: Schema<User> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
export default mongoose.model<User>('User', UserSchema)

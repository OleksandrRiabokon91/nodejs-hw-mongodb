import mongoose, { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

sessionSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

export const SessionsCollection = model('sessions', sessionSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IShort extends Document {
  title: string;
  civilization: 'Egypt' | 'Rome' | 'Greece' | 'Mesopotamia' | 'Persia';
  status: 'Idea' | 'Script Ready' | 'Visual Ready' | 'Published';
  scheduledDate: string;
  script: string;
  imagePrompts: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShortSchema = new Schema<IShort>(
  {
    title: { type: String, required: true },
    civilization: {
      type: String,
      required: true,
      enum: ['Egypt', 'Rome', 'Greece', 'Mesopotamia', 'Persia'],
    },
    status: {
      type: String,
      required: true,
      enum: ['Idea', 'Script Ready', 'Visual Ready', 'Published'],
      default: 'Idea',
    },
    scheduledDate: { type: String, default: '' },
    script: { type: String, default: '' },
    imagePrompts: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Short || mongoose.model<IShort>('Short', ShortSchema);

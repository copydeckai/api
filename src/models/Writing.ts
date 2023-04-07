import { model, Schema } from 'mongoose';
import { IWriting } from '../types/writing';

const WritingSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    authorId: {
      type: String,
      required: true,
    },
    authorFname: {
      type: String,
      required: true,
    },
    authorLname: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
    },
    views: {
      type: Number,
    },
    charCount: {
      type: Number,
      required: true,
    },
    wordCount: {
      type: Number,
      required: true,
    },
    urlString: {
      type: String,
      required: true,
      unique: true,
    },
    aiSettings: [
      {
        storyBackground: String,
        outputLength: Number,
      },
    ],
    status: {
      type: String,
      required: true,
      default: 'active',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isCreated: {
      type: Date,
      default: Date.now,
    },
    isUpdated: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<IWriting>('Writing', WritingSchema);

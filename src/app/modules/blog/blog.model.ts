import { model, Schema } from 'mongoose';
import { Tblog } from './blog.interface';

const blogSchema = new Schema<Tblog>({
  title: {
    type: String,
    required: [true, 'Title is Required'],
  },
  content: {
    type: String,
    required: [true, 'Content is Required'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

export const Blog = model<Tblog>('Blog', blogSchema);

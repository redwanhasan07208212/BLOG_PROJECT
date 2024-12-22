import QueryBuilder from '../../builder/queryBuilder';
import { blogSearchAbleFields } from './blog.constant';
import { Tblog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDb = async (payload: Tblog) => {
  const result = await Blog.create(payload);
  return result;
};
const getAllBlogIntoDb = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate('author.user'), query)
    .search(blogSearchAbleFields)
    .filter()
    .paginate()
    .sort()
    .fields();

  const result = blogQuery.modelQuery;
  return result;
};

const updateBlogIntoDb = async (id: string, payload: Partial<Tblog>) => {
  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteBlogIntoDb = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
export const blogService = {
  createBlogIntoDb,
  getAllBlogIntoDb,
  updateBlogIntoDb,
  deleteBlogIntoDb,
};

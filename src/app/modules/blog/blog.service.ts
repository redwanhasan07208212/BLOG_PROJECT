import httpStatus from 'http-status';
import QueryBuilder from '../../builder/queryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { blogSearchAbleFields } from './blog.constant';
import { Tblog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDb = async (author: string, payload: Tblog) => {
  const authorExist = await User.findById(author);
  if (!authorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }
  const result = (await Blog.create({ ...payload, author })).populate({
    path: 'author',
    select: '-role -isBlocked',
  });
  return result;
};
const getAllBlogIntoDb = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate({
      path: 'author',
      select: '-role -isBlocked',
    }),
    query,
  )
    .search(blogSearchAbleFields)
    .filter()
    .paginate()
    .sort()
    .fields();

  const result = blogQuery.modelQuery;
  return result;
};

const updateBlogIntoDb = async (
  id: string,
  author: string,
  payload: Partial<Tblog>,
) => {
  const blogExist = await Blog.findById(id);

  if (!blogExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const isAuthorExist = await User.findById(author);

  if (!isAuthorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }

  const isAuthorBlog = blogExist.author.toString() === author.toString();

  if (!isAuthorBlog) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Can Not update other's blog");
  }
  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteBlogIntoDb = async (id: string, author: string) => {
  const blogExist = await Blog.findById(id);

  if (!blogExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const isAuthorExist = await User.findById(author);

  if (!isAuthorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }

  const isAuthorBlog = blogExist.author.toString() === author.toString();

  if (!isAuthorBlog) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Can Not delete other's blog");
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
export const blogService = {
  createBlogIntoDb,
  getAllBlogIntoDb,
  updateBlogIntoDb,
  deleteBlogIntoDb,
};

/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogService } from './blog.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createBlog = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  const result = await blogService.createBlogIntoDb(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Blog created successfully',
    success: true,
    data: result,
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllBlogs = catchAsync(async (req, res, next) => {
  const result = await blogService.getAllBlogIntoDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Blogs fetched successfully',
    success: true,
    data: result,
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateBlogs = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const authorId = req.user.id;
  const result = await blogService.updateBlogIntoDb(id, authorId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Blog updated successfully',
    success: true,
    data: result,
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteBlogs = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const authorId = req.user.id;
  const result = await blogService.deleteBlogIntoDb(id, authorId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Blog deleted successfully',
    success: true,
    data: result,
  });
});

export const blogController = {
  createBlog,
  getAllBlogs,
  updateBlogs,
  deleteBlogs,
};

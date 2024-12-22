import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { updateBlogController } from './admin.service';

const updateblogByAdmin = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await updateBlogController.updateBlogByAdminIntoDb(userId, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User blocked successfully',
    success: true,
  });
});

const deleteblogByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  await updateBlogController.deleteBlogByAdminIntoDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Blog deleted successfully',
    success: true,
  });
});

export const adminControlller = {
  updateblogByAdmin,
  deleteblogByAdmin,
};

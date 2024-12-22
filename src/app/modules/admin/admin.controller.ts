import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { updateBlogController } from './admin.service';

const updateblogByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateBlogController.updateBlogByAdminIntoDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User blocked successfully',
    success: true,
    data: result,
  });
});

const deleteblogByAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
     await updateBlogController.deleteBlogByAdminIntoDb(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'User blocked successfully',
      success: true,
    });
  });

export const adminControlller = {
  updateblogByAdmin,
  deleteblogByAdmin
};

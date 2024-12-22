import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const updateBlogByAdminIntoDb = async (id: string, user: JwtPayload) => {
  const userDefined = await User.findById(id);

  if (!userDefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (userDefined._id.toString() === user.id.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, 'You can not block yourself');
  }
  const result = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
    },
  );
  return result;
};

const deleteBlogByAdminIntoDb = async (id: string) => {
  await User.findByIdAndDelete(id);
};

export const updateBlogController = {
  updateBlogByAdminIntoDb,
  deleteBlogByAdminIntoDb,
};

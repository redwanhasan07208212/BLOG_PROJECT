import { User } from '../user/user.model';

const updateBlogByAdminIntoDb = async (id: string) => {
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

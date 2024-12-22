import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import { Tuser } from '../user/user.interface';
const loginUser = async (payLoad: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payLoad?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const isUserBlocked = user?.isBlocked;
  if (isUserBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  const matchedPassword = await bcrypt.compare(payLoad.password, user.password);
  if (!matchedPassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );

  return {
    accessToken,
  };
};
const registerUserIntoDb = async (payload: Tuser) => {
  const newUser = (await User.create(payload)).toObject();
  const result = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
  return result;
};

export const authService = {
  loginUser,
  registerUserIntoDb
};
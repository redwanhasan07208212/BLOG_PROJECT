import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { adminControlller } from './admin.controller';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  adminControlller.updateblogByAdmin,
);

router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  adminControlller.deleteblogByAdmin,
);

export const adminRoutes = router;
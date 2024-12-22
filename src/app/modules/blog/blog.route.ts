import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validate';
import { USER_ROLE } from '../user/user.constant';
import { blogController } from './blog.controller';
import { blogModelValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogModelValidation.blogModelSchema),
  blogController.createBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(blogModelValidation.blogModelUpdateSchema),
  blogController.updateBlogs,
);
router.delete('/:id', auth(USER_ROLE.user), blogController.deleteBlogs);
router.get('/', blogController.getAllBlogs);

export const blogRoutes = router;

import express from 'express';
import validateRequest from '../../middlewares/validate';
import { blogController } from './blog.controller';
import { blogModelValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(blogModelValidation.blogModelSchema),
  blogController.createBlog,
);

router.patch(
  '/:id',
  validateRequest(blogModelValidation.blogModelUpdateSchema),
  blogController.updateBlogs,
);
router.delete('/:id', blogController.deleteBlogs);
router.get('/', blogController.getAllBlogs);

export const blogRoutes = router;

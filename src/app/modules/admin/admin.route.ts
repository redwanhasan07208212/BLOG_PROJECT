import express from 'express';
import { adminControlller } from './admin.controller';

const router = express.Router();

router.patch('/users/:userId/block', adminControlller.updateblogByAdmin);
export const userRoutes = router;

router.delete('/blogs/:id', adminControlller.deleteblogByAdmin);

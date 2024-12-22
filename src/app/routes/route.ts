import { Router } from 'express';
import { adminRoutes } from '../modules/admin/admin.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { blogRoutes } from '../modules/blog/blog.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

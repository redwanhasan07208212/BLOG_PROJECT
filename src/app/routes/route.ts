import { Router } from 'express';
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
    route: AuthRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

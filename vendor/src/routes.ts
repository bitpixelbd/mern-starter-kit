/* eslint-disable */

import { lazy } from 'react';
// import CareTypes from './pages/care-types';

const Dashboard = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/products'));
const DetailRequestTeacher = lazy(() => import('./pages/products/details'));
const Orders = lazy(() => import('./pages/orders'));
const Coupons = lazy(() => import('./pages/coupons'));
const Withdrawals = lazy(() => import('./pages/withdrawals-request'));
const Reviews = lazy(() => import('./pages/reviews'));
const Revenues = lazy(() => import('./pages/revenues'));
const Stores = lazy(() => import('./pages/store'));
const OrderRequest = lazy(() => import('./pages/order-request'));

const routes = [
  { path: '/', element: Dashboard },
  { path: '/products', element: Products },
  { path: '/products/details/:id', element: DetailRequestTeacher },
  { path: '/orders', element: Orders },
  { path: '/coupons', element: Coupons },
  { path: '/withdrawals', element: Withdrawals },
  { path: '/reviews', element: Reviews },
  { path: '/revenues', element: Revenues },
  { path: '/stores', element: Stores },
  { path: '/order-request', element: OrderRequest },
];

export default routes;

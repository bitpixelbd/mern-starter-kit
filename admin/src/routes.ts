/* eslint-disable */

import { lazy } from 'react';
import CareTypes from './pages/care-types';

const Dashboard = lazy(() => import('./Pages/Home'));
const Categories = lazy(() => import('./Pages/categories'));
const Products = lazy(() => import('./Pages/products'));
const Discount = lazy(() => import('./Pages/discounts'));
// const amenityGroup = lazy(() => import('./pages/amenityGroup'))
// const teacherRequest = lazy(() => import('./pages/teacher-request'));
// const detailRequestTeacher = lazy(() => import('./pages/teacher-request/details'));
// const faqs = lazy(() => import('./pages/Faqs'));
// const testimonials = lazy(() => import('./pages/Testimonials'));
// const careHome = lazy(() => import('./pages/CareHome'));
// const testimonialDetails = lazy(() => import('./pages/Testimonials/details'));
// const careHomeDetails = lazy(() => import('./pages/CareHome/details'));
// const review = lazy(() => import('./pages/Reviews'));
// const settings = lazy(() => import('./pages/Settings'));
// const blog = lazy(() => import('./pages/blogs'));
// const blogDetails = lazy(() => import('./pages/blogs/details'));
// const features = lazy(() => import('./pages/features'));
// const featureDetails = lazy(() => import('./pages/features/details'));
// const careTypes = lazy(() => import('./pages/care-types'));
// const roomTypes = lazy(() => import('./pages/room-types'));
// const cities = lazy(() => import('./pages/cities'));
// const amenities = lazy(() => import('./pages/amenities'));
// const amenityGroupDetails = lazy(() => import('./pages/amenityGroup/details'));
// // const amenities = lazy(() => import('./pages/amenities'));
// const user = lazy(() => import("./pages/User"));
// const advisor = lazy(() => import('./pages/Advisor'))
// const advisorDetails = lazy(() => import('./pages/Advisor/details'));
// const userDetails = lazy(() => import('./pages/User/details'));
// const contactExperts = lazy(() => import('./pages/contact-experts'))
// const contactExpertsDetails = lazy(() => import('./pages/contact-experts/details'))
// const staticPages = lazy(() => import('./pages/static-page'))
// const staticPagesDetails = lazy(() => import('./pages/static-page/details'))
// const referralRequest = lazy(()=>import('./pages/referral_request'))
// const partner = lazy(()=> import('./pages/partner'))
// const partnerDetail = lazy (()=> import('./pages/partner/details'))
// const quizzAnswers = lazy(()=>import('./pages/quizz-answers'))
// const tourRequestPage = lazy(()=>import('./pages/tour-request'))



const routes = [
  { path: '/', element: Dashboard },
  { path: '/categories', element: Categories },
  { path: '/products', element: Products },
  { path: '/discounts', element: Discount },

];

export default routes;

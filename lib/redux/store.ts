import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import blogReducer from './blogSlice';
import newsReducer from './newsSlice';
import adminReducer from './adminSlice';
import adminProfileReducer from './adminProfileSlice';
import userProfileReducer from './userProfileSlice';
import orderReducer from './orderSlice';
import enquiryReducer from './enquirySlice';
import heroReducer from './heroSlice';
import reviewReducer from './reviewSlice';
import categorySlideReducer from './categorySlideSlice';
import collectionReducer from './collectionSlice';
import categorySectionReducer from './categorySectionSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    blog: blogReducer,
    news: newsReducer,
    admin: adminReducer,
    adminProfile: adminProfileReducer,
    userProfile: userProfileReducer,
    orders: orderReducer,
    enquiry: enquiryReducer,
    hero: heroReducer,
    reviews: reviewReducer,
    categorySlides: categorySlideReducer,
    collections: collectionReducer,
    categorySections: categorySectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
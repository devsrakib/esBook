import { configureStore } from "@reduxjs/toolkit";
import customerReducer from '../features/customer/customerSlice';
import slipReducer from '../features/slip/SlipSlice';
import productReducer from '../features/product/productSlice';
import counterReducer from "../actions/slipCartQuantitySlice";




const store = configureStore({
    reducer: {
        customers: customerReducer,
        slips: slipReducer,
        products: productReducer,
        quantityCounter: counterReducer
    }
})


export default store;
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
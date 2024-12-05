import { configureStore } from "@reduxjs/toolkit";
import customerReducer from '../features/customer/customerSlice';
const store = configureStore({
    reducer: {
        customers: customerReducer,
    }
})


export default store;
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
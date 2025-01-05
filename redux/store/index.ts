import { configureStore } from "@reduxjs/toolkit";
import customerReducer from '../features/customer/customerSlice';
import slipReducer from '../features/slip/SlipSlice';
import productReducer from '../features/product/productSlice';
import counterReducer from "../actions/slipCartQuantitySlice";
import createProductReducer from '../features/product/createProductSlice';
import loginReducer from '../features/login/loginSlice'
import supplierSlice  from "../features/supplier/supplierSlice";
import ownerReducer from '../features/owner/ownerSlice';
import backgroundColor from '../actions/backgroundColorSlice'



export const store = configureStore({
    reducer: {
        auth: loginReducer,
        customers: customerReducer,
        suppliers: supplierSlice,
        slips: slipReducer,
        products: productReducer,
        quantityCounter: counterReducer,
        createProduct: createProductReducer,
        owner: ownerReducer,
        backgroundColor: backgroundColor
    }
})


// export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

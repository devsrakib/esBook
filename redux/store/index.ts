import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customer/customerSlice";
import slipReducer from "../features/slip/SlipSlice";
import productReducer from "../features/product/productSlice";
import counterReducer from "../actions/slipCartQuantitySlice";
import createProductReducer from "../features/product/createProductSlice";
import loginReducer from "../features/login/loginSlice";
import supplierSlice from "../features/supplier/supplierSlice";
import ownerReducer from "../features/owner/ownerSlice";
import colorReducer from "../actions/colorSlice";
import slipHistoryReducer from "../features/slip/slipHistorySlice";
import postCashSellReducer from "../features/cashboxDashboard/cashSellSlice";
import getCashSellReducer from "../features/cashboxDashboard/getCashSellSlice";
import postDepositReducer from "../features/cashboxDashboard/dipositeSlice";
import getDepositReducer from "../features/cashboxDashboard/getDepositSlice";
import getExpenseReducer from "../features/cashboxDashboard/getExpenseSlice";
import postExpense from "../features/cashboxDashboard/expenseSlice";
import  getWithdrawReducer  from "../features/cashboxDashboard/getWithdrawSlice";
import postWithdraw from '../features/cashboxDashboard/withdrawSlice';
import cashBoxREducer from '../features/matchCashbox/cashboxSlice';

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
    colors: colorReducer,
    slipHistory: slipHistoryReducer,
    postCashSell: postCashSellReducer,
    getCashSell: getCashSellReducer,
    postDeposit: postDepositReducer,
    getDeposit: getDepositReducer,
    getExpense: getExpenseReducer,
    postExpense: postExpense,
    getWithdraw: getWithdrawReducer,
    postWithdraw: postWithdraw,
    cashbox: cashBoxREducer
  },
});

// export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

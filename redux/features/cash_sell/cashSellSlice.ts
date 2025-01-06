import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postCashSell = createAsyncThunk('cashSell/postCashSell', async (data, {rejectWithValue}) =>{
    try{
        const token = await getToken();
        if(!token) throw new Error('token not found')
        const response = await axios.post(`${API_URL}cash-sells/`, data, {
    headers:{
        Authorization: `Bearer ${token}`
    }})
    console.log(response);
    
    return response.data;
    }
    catch(error:any){
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
}) 

interface IInitialState{
    cash_sells: [],
loading: boolean,
error: any
}

const initialState:IInitialState ={
cash_sells: [],
loading: false,
error: null
}

const cashSellSlice = createSlice({
    name: 'cashSell',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(postCashSell.pending, state =>{
            state.loading = true;
        });
        builder.addCase(postCashSell.fulfilled, (state, action) =>{
            state.cash_sells = action.payload;
            state.loading = false;
        });
        builder.addCase(postCashSell.rejected, (state, action) =>{
            state.error = action.payload,
            state.loading = false;
        })
    }
})


export default cashSellSlice.reducer
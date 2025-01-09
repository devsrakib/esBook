import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postWithdraw = createAsyncThunk('expenses', async(data, {rejectWithValue}) =>{
    try{
        const token = await getToken();
        if(!token) throw new Error('Token not found!')
        const response = await axios.post(`${API_URL}withdraws/`, data, {
            headers:{
    Authorization: `Bearer ${token}`
            }
        })
        return response?.data
    }catch(error:any){
        return rejectWithValue(error?.message ? error?.message : error?.data?.message);
    }
})

interface IInitialState{
    withdraw:null,
            loading: false,
            error: null | any
}


const initialState: IInitialState = {
    withdraw: null,
    loading: false,
    error: null
}

const expenseSlice = createSlice({
    name: 'withdraw',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{
        builder.addCase(postWithdraw.pending, state =>{
            state.loading = false;
        });
        builder.addCase(postWithdraw.fulfilled, (state, action) =>{
            state.withdraw = action.payload;
            state.loading = false;
        });
        builder.addCase(postWithdraw.rejected, (state, action) =>{
            state.error = action.payload,
            state.withdraw = null
        })
    }
})


export default expenseSlice.reducer
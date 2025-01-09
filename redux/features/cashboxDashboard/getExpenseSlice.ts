import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExpense = createAsyncThunk('expense', async(_, {rejectWithValue}) =>{
    try{
        const token = await getToken();
        if(!token) throw new Error('Token not found!')
        const response = await axios.get(`${API_URL}expenses/`, {
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
    expense:{
        count: number,
        data: [],
        links: {
            next: null,
            previous: null | string,
        },
    },
            loading: false,
            error: null | any
}


const initialState: IInitialState = {
    expense: {
        count: 0,
        data: [],
        links: {
            next: null,
            previous: null,
        },
    },
    loading: false,
    error: null
}

const expenseSlice = createSlice({
    name: 'deposit',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{
        builder.addCase(fetchExpense.pending, state =>{
            state.loading = false;
        });
        builder.addCase(fetchExpense.fulfilled, (state, action) =>{
            state.expense = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchExpense.rejected, (state, action) =>{
            state.error = action.payload;
        })
    }
})


export default expenseSlice.reducer
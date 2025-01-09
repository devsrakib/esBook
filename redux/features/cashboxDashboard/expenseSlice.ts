import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postExpense = createAsyncThunk('expenses', async(data, {rejectWithValue}) =>{
    try{
        const token = await getToken();
        if(!token) throw new Error('Token not found!')
        const response = await axios.post(`${API_URL}expenses/`, data, {
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
    expense:null,
            loading: false,
            error: null | any
}


const initialState: IInitialState = {
    expense: null,
    loading: false,
    error: null
}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{
        builder.addCase(postExpense.pending, state =>{
            state.loading = false;
        });
        builder.addCase(postExpense.fulfilled, (state, action) =>{
            state.expense = action.payload;
            state.loading = false;
        });
        builder.addCase(postExpense.rejected, (state, action) =>{
            state.error = action.payload,
            state.expense = null
        })
    }
})


export default expenseSlice.reducer
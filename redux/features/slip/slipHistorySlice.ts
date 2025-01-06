import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSlipHistory = createAsyncThunk('slip/fetchSlipHistory', async (_, {rejectWithValue}) =>{
    try{
        const token = await getToken();
        if(!token) throw new Error('token not found')
        const response = await axios.get(`${API_URL}slips/`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        console.log(token, 'from slip h res');
        
        return response?.data
    }
    catch(error:any){
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

const initialState = {
    slips: {
        count: 0,
    data: [],
    links: {
        next: null,
        previous: null
    },
    },
    loading: false,
    error: null

}


const getSlipSlice = createSlice({
    name: 'slip',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
builder.addCase(fetchSlipHistory.pending, state =>{
    state.loading = true;
});
builder.addCase(fetchSlipHistory.fulfilled, (state, action) =>{
    console.log(action, 'from action');
    
    state.slips = action.payload;
    state.loading = false;
});
builder.addCase(fetchSlipHistory.rejected, (state, action) =>{
    state.loading = false;
    state.error = action.payload;
})
    }
})


export default getSlipSlice.reducer
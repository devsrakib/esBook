import { API_URL } from "@/constants/api_url";
import { CustomerState } from "@/types/customer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCustomer = createAsyncThunk("customer/fetchCustomers", async() =>{
try{
  const token = await AsyncStorage.getItem('access_token')
  if (!token) throw new Error('Token not found');
  console.log(token);
  
  const res = await axios.get(`${API_URL}customers/`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  } )
  
  return res?.data
}
catch(error){
  console.log(error);
  
}
})

const initialState: CustomerState = {
 customer: [],
 loading: false,
 error: null

} 

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomer.pending, (state) =>{
state.loading = true
    });
    builder.addCase(fetchCustomer.fulfilled, (state, action) =>{
      state.customer = action.payload
      state.loading= false,
      state.error = null
    });
    builder.addCase(fetchCustomer.rejected, (state, action) =>{
      state.customer = [],
      state.loading = false,
      state.error = action.error.message
    })
  }

})


export default customerSlice.reducer
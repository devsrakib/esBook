import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOwner = createAsyncThunk(
  "owners/fetchOwner",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) throw new Error("Token not found");
      const response = await axios.get(`${API_URL}owners/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response ? error?.response?.data : error?.message
      );
    }
  }
);






const initialState = {
  owners: {
    count: 0,
    data: [],
    links: {
      next: null,
      previous: null,
    },
  },
  loading: false,
  error: null,
};

const ownerSlice = createSlice({
  name: "owners",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchOwner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    build.addCase(fetchOwner.fulfilled, (state, action) => {
      console.log(action, "))))))))))))))))))))))");

      state.owners = action.payload;
      state.loading = false;
      state.error = null;
    });
    build.addCase(fetchOwner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
    });
  },
});

export default ownerSlice.reducer;

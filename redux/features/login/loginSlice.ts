import { API_URL } from '@/constants/api_url';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Step 1: Create the async thunk
export const loginUser = createAsyncThunk(
  'auth/login', // Action type
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}user/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return data; // Assuming the response contains user data or token
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

// Step 2: Create the slice
const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Assuming the payload contains user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Error message
      });
  },
});

// Step 3: Export actions and reducer
export const { logout } = loginSlice.actions;

export default loginSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        authAdmin: null,
    },
    reducers: {
        setAuthAdmin: (state, action) => {
            state.authAdmin = action.payload;
        },
        logoutAdmin: (state) => {
            state.authAdmin = null;
        },
    },
});

export const { setAuthAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;

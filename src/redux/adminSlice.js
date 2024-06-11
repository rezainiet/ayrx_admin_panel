import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authAdmin: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
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

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isConnected: false,
    onlineUser: [],
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setStoreIsConnected: (state, action) => {
            state.isConnected = action.payload;
        },
        setStoreOnlineUsers: (state, action) => {
            state.onlineUser = action.payload;
        },
    },
});

export const { setStoreIsConnected, setStoreOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;

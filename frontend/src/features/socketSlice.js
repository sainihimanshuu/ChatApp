import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userSocket: null,
    onlineUser: [],
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setStoreUserSocket: (state, action) => {
            state.userSocket = action.payload;
        },
        setStoreOnlineUsers: (state, action) => {
            state.onlineUser = action.payload;
        },
    },
});

export const { setStoreUserSocket, setStoreOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;

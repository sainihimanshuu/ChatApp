import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/authSlice.js";
import socketReducers from "../features/socketSlice.js";
import socketMiddleware from "../features/socketMiddleware.js";

export const store = configureStore({
    reducer: {
        auth: authReducers,
        socket: socketReducers,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(socketMiddleware),
});

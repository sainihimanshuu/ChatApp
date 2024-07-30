import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import {
    HomePage,
    LoginPage,
    SignupPage,
    ChatAreaPage,
} from "./pages/index.js";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { ConversationContextProvider } from "./context/ConversationContext.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
                path="/chatArea"
                element={
                    <ConversationContextProvider>
                        <ChatAreaPage />
                    </ConversationContextProvider>
                }
            />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <SocketContextProvider>
            <RouterProvider router={router} />
        </SocketContextProvider>
    </Provider>
);

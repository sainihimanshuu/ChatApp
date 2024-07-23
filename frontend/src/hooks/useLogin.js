import axios from "../axios/axios.js";
import { storeLogin } from "../features/authSlice.js";
import {
    setStoreUserSocket,
    setStoreOnlineUsers,
} from "../features/socketSlice.js";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

//only doubt -> will the onlineUsers event listener work? just console log whereever douubt to check
const useLogin = () => {
    const login = (data, setIsValidCredentials) => {
        const dispatch = useDispatch();
        axios
            .post("/user/userLogin", data)
            .then((response) => {
                dispatch(storeLogin(response.data.user));
                setIsValidCredentials(true);
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.accessToken)
                );
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                const socket = io("http://localhost:8000", {
                    query: {
                        userId: response.data.user._id,
                    },
                });
                dispatch(setStoreUserSocket(socket));
                socket.on("onlineUsers", (users) => {
                    dispatch(setStoreOnlineUsers(users));
                });
            })
            .catch((error) => {
                console.log("error while logging in", error);
                setIsValidCredentials(false);
            });
    };

    return login;
};

export default useLogin;

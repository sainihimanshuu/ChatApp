import axios from "../axios/axios.js";
import { storeLogin } from "../features/authSlice.js";
import { useDispatch } from "react-redux";
// import { io } from "socket.io-client";

//only doubt -> will the onlineUsers event listener work? just console log whereever douubt to check
const useLogin = () => {
    const dispatch = useDispatch();
    const login = (data, setIsValidCredentials) => {
        axios
            .post("/user/loginUser", data)
            .then((response) => {
                dispatch(storeLogin(response.data.user)); //to login in store
                setIsValidCredentials(true);
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.accessToken)
                );
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                //dispatch({ type: "socket/connect" }); // to store the socket instance
            })
            .catch((error) => {
                console.log("error while logging in", error);
                setIsValidCredentials(false);
            });
    };

    return login;
};

export default useLogin;

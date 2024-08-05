import axios from "../axios/axios.js";
import { useSelector } from "react-redux";

const useRefresh = () => {
    const user = useSelector((state) => state.auth.user);

    const refresh = async () => {
        try {
            const response = await axios.get("/user/refreshToken", {
                withCredentials: true,
            });

            localStorage.setItem(
                `token${user._id}`,
                JSON.stringify(response.data.accessToken)
            );

            return response.data.accessToken;
        } catch (error) {
            console.log("error while refreshing tokens in useRefresh", error);
        }
    };

    return refresh;
};

export default useRefresh;

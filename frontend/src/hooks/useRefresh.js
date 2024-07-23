import axios from "../axios/axios.js";

const useRefresh = () => {
    const refresh = async () => {
        try {
            const response = await axios.get("/user/refreshToken", {
                withCredentials: true,
            });

            localStorage.setItem(
                "token",
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

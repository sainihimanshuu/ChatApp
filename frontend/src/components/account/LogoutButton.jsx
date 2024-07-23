import { useAxiosPrivate } from "../../hooks/useAxiosPrivate.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeLogout } from "../features/authSlice.js";
import { setStoreUserSocket } from "../features/socketSlice.js";

export default function LogoutButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();

    const handleLogout = () => {
        axiosPrivate
            .post("/user/logoutUser")
            .then((response) => {
                dispatch(storeLogout());
                localStorage.removeItem("token");
                const socket = useSelector((state) => state.socket.userSocket);
                socket.close(); //or socket.disconnet();
                dispatch(setStoreUserSocket(null));
            })
            .catch((error) => console.log("error while logging out", error))
            .finally(() => navigate("/"));
    };
    return (
        <div>
            <Button className="myButton" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}

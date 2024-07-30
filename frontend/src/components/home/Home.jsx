import { useSelector } from "react-redux";
import { Button } from "../input/index.js";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const loginStatus = useSelector((state) => state.auth.loginStatus);
    const navigate = useNavigate();

    const handleCreate = () => {
        if (!loginStatus) {
            navigate("/signup");
        } else {
            navigate("/chatArea");
        }
    };

    return (
        <div>
            <div>
                <h2 className="text-darkBrown text-3xl font-semibold font mt-20 mb-5">
                    Chat with your friends
                </h2>
                <h3 className="text-darkBrown text-xl font-semibold font mb-3">
                    Chat now !
                </h3>
            </div>
            <Button className="myButton" onClick={handleCreate}>
                Chat
            </Button>
        </div>
    );
}

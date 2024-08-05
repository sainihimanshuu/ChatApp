import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { useConversationContext } from "../../context/ConversationContext.jsx";

export default function UserList() {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { onlineUsers } = useSocketContext();
    const { setReceiver, setConversation } = useConversationContext();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate
            .post("/user/getOnlineUserList", onlineUsers)
            .then((response) => {
                setUserList(response.data.onlineUserDetails);
                setLoading(false);
            })
            .catch((error) =>
                console.log(
                    "error while fetching online users for sidebar",
                    error
                )
            );
    }, [onlineUsers]);

    const getConversation = (receiver) => {
        console.log(receiver.username);
        axiosPrivate
            .get(`/message/getMessages/${receiver._id}`)
            .then((response) => {
                setConversation(response.data.messages);
                setReceiver(receiver);
            })
            .catch((error) => {
                console.log(
                    "error while fetching conversation in UserList",
                    error
                );
            });
    };

    return !loading ? (
        <div className="overflow-auto">
            {userList.length === 0 ? (
                <h1>No one is online</h1>
            ) : (
                userList.map((user) => (
                    <div
                        className="flex items-center m-1 p-1 border-2 border-black clickableDiv"
                        onClick={() => getConversation(user)}
                    >
                        <img
                            className="size-12"
                            src={
                                user?.avatar?.url
                                    ? user?.avatar?.url
                                    : "/no-profile-picture-15257.svg"
                            }
                        />
                        <h1 className="ml-3">{user.username}</h1>
                    </div>
                ))
            )}
        </div>
    ) : (
        <h1>Loading...</h1>
    );
}

import { createContext, useContext, useState } from "react";

const ConversationContext = createContext(null);

export const useConversationContext = () => {
    return useContext(ConversationContext);
};

export const ConversationContextProvider = ({ children }) => {
    const [conversation, setConversation] = useState(null);

    return (
        <ConversationContext.Provider value={{ conversation, setConversation }}>
            {children}
        </ConversationContext.Provider>
    );
};

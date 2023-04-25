import React, {
    useEffect,
    useRef,
    useState,
} from "react";
import style from "./ChatArea.module.scss";
import { Chatbox, Message } from "@/components";
import images from "@/constants/images";
import Chatbot from "../../services/FormChatbot/FormChatbot";

const chatbot = new Chatbot();

const ChatArea = () => {
    const chatBottomRef = useRef<HTMLDivElement>(null);
    const [isChatDisabled, setIsChatDisabled] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    useScrollToChatBottom(chatBottomRef, messages);
    useInitBot(setMessages);
    useEndChat(setIsChatDisabled);
    return (
        <div className={style["app__chat_area"]}>
            <img src={images.aces.src} />
            {messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
            <Chatbox
                setIsChatDisabled={setIsChatDisabled}
                postMessage={setMessages}
                requestReply={requestBotReply}
                isDisabled={isChatDisabled}
                isChatDone={chatbot.isChatDone}
            />
            <div ref={chatBottomRef} />
        </div>
    );
};

export default ChatArea;

// Keep chat in screen
const useScrollToChatBottom = (
    chatBottomRef: React.RefObject<HTMLDivElement>,
    messages: Message[]
) => {
    const scrollToBottom = () => {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
};

// Interact with bot
// a. initialize bot
const useInitBot = (
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
    useEffect(() => {
        setMessages((messages) => [...messages, chatbot.init()]);
    }, []);
};
// b. request bot replies (used as action callback fn inside Chatbox)
const requestBotReply = (
    message: Message,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setIsChatDisabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setIsChatDisabled(true);
    setTimeout(() => {
        (async () => {
            setIsChatDisabled(false);
            chatbot
                .reply(message) //request bot reply to last user message
                .then((botReply) => {
                    setMessages((messages) => [...messages, botReply]);
                });
        })();
    }, 1000);
};

// end chat when finished
const useEndChat = (
    setIsChatDisabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
    useEffect(() => {
        if (chatbot.isChatDone) {
            setIsChatDisabled(true);
        }
    }, [chatbot.isChatDone]);
};

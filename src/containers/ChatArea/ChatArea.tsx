import React, { useEffect, useRef, useState } from "react";
import style from "./ChatArea.module.scss";
import { Chatbox, Message } from "@/components";
import images from "@/constants/images";
import Chatbot from "../../services/FormChatbot/FormChatbot";

const chatbot = new Chatbot();

const ChatArea = () => {
    const chatBottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const chatAreaRef = useRef<HTMLDivElement>(null)

    useScrollToChatBottom(chatBottomRef, messages);
    useInitBot(setMessages);
    
    return (
        <div className={style["app__chat_area"]} ref={chatAreaRef}>
            <img src={images.aces.src} />
            <div className={style["app__chat_feed"]}>
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
                <div
                    className={style["app__chat_bottom"]}
                    ref={chatBottomRef}
                />
            </div>
            <Chatbox
                postMessage={setMessages}
                requestReply={requestBotReply}
                isChatDone={chatbot.isChatDone}
            />
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
        chatBottomRef.current?.scrollIntoView({behavior: "smooth"});
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
        setMessages((messages) => [...messages, chatbot.startBot()]);
    }, []);
};
// b. request bot replies (used as action callback fn inside Chatbox)
const requestBotReply = (
    message: Message,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) => {
    // setIsChatDisabled(true);
    setTimeout(() => {
        (async () => {
            chatbot
                .reply(message) //request bot reply to last user message
                .then((botReply) => {
                    setMessages((messages) => [...messages, botReply]);
                });
        })();
    }, 1000);
};
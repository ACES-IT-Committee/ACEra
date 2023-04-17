import React, { useEffect, useRef, useState } from "react";
import style from "./ChatArea.module.scss";
import msgs from "@/constants/messages";
import {motion} from 'framer-motion'
import { Chatbox, Message } from "@/components";
import images from "@/constants/images";
import ChatBot from "@/services/ChatBot";
const ChatArea = () => {
    const [messages, setMessages] = useState<Message[]>([])

    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({behavior: "smooth"})
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages])
    
    useEffect(() => {
        ChatBot(setMessages)
    }, [])
    
    return (
        <div className={style["app__chat_area"]}>
            <img src={images.aces.src} />
            {messages.map((message, index) =>
                    <Message key={index} message={message} />
                )}
            <Chatbox postMessage={setMessages} />
            <div ref={chatEndRef}/>
        </div>
    );
};

export default ChatArea;

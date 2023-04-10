import React, { useState } from "react";
import style from "./ChatArea.module.scss";
import msgs from "@/constants/messages";
import {motion} from 'framer-motion'
import { Chatbox, Message } from "@/components";
import images from "@/constants/images";
const ChatArea = () => {
    const [messages, setMessages] = useState<Message[]>([])
    
    return (
        <div className={style["app__chat_area"]}>
            <img src={images.aces.src} />
            {msgs.map((message, index) =>
                    <Message key={index} message={message} />
                )}
            <Chatbox messages={messages} postMessage={setMessages} />
        </div>
    );
};

export default ChatArea;

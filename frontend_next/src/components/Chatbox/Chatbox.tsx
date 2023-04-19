import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import style from "./Chatbox.module.scss";
import ChatBot from "@/services/ChatBot";
import { motion } from "framer-motion";

const buttonVariants = {
    circular: { borderRadius: "50%", height: "3rem"},
    rectangular: {borderRadius: "30px", height: "15vh"}
    
}
const Chatbox = ({
    postMessage,
    disabled,
    typingSetter
}: {
        postMessage: React.Dispatch<React.SetStateAction<Message[]>>,
        disabled?: boolean,
        typingSetter: (typing: boolean) => void
}) => {
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [boxFocused, setBoxFocused] = useState(false)

    const createMessage = (sender: string, message: string) => {
        postMessage((messages) => [
            ...messages,
            { sender: sender, message: message },
        ]);
    };

    const handlePostMessage = (e: BaseSyntheticEvent) => {
        e?.preventDefault();
        createMessage("user", messageRef.current!.value);
        messageRef.current!.value = "";
    };

    useEnterSend(messageRef, buttonRef)

    disabled && useDisableChat(messageRef, buttonRef, disabled)

    return (
        <form onSubmit={handlePostMessage}>
            <textarea
                className={style["app__chatbox"]}
                placeholder="Write an awesome message..."
                ref={messageRef}
                name="message"
                onFocus={ () => setBoxFocused(true)}
                onBlur={ () => setBoxFocused(false)}
            ></textarea>
            <motion.button
                className={style["app__chatbox-submit"]}
                ref={buttonRef}
                onClick={() => {
                    typingSetter(true)
                    setTimeout(() => {
                        typingSetter(false)
                        ChatBot(postMessage)
                    }, 5000)
                }}
                animate={!boxFocused ? "circular" : "rectangular"}
                variants={buttonVariants}
            >
                <BsFillSendFill />
            </motion.button>
        </form>
    );
};

export default Chatbox;

const useEnterSend = (messageRef: React.RefObject<HTMLTextAreaElement>, buttonRef: React.RefObject<HTMLButtonElement>) => {
    useEffect(() => {
        messageRef.current?.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.code === "Enter") {
                e.preventDefault();
                buttonRef.current?.click();
            }
        });
    }, []);
}

const useDisableChat = (messageRef: React.RefObject<HTMLTextAreaElement>, buttonRef: React.RefObject<HTMLButtonElement>, disabled: boolean) => {
    useEffect(() => {
        if (disabled)
        {
            messageRef.current?.setAttribute("disabled", "true")
            buttonRef.current?.setAttribute("disabled", "true")
        }
    }, [disabled])
}

const useTypingPlaceholder = () => {
    
}
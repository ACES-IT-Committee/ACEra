import React, { BaseSyntheticEvent, useEffect, useRef } from "react";
import {BsFillSendFill} from "react-icons/bs"
import style from "./Chatbox.module.scss";
import ChatBot from "@/services/ChatBot";
const Chatbox = ({
    postMessage,
}: {
    postMessage: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
    const messageRef = useRef<HTMLTextAreaElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const createMessage = (sender: string, message: string) => {
        postMessage((messages) => [...messages, {sender: sender, message: message}]);
    };

    const handlePostMessage = (e: BaseSyntheticEvent) => {
        e?.preventDefault()
        createMessage("user", messageRef.current!.value)
        messageRef.current!.value = "";

    }

    useEffect(() => {
        messageRef.current?.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.code === "Enter")
            {
                e.preventDefault()
                buttonRef.current?.click()
                
            }
        })
    }, [])
    return (
        <form onSubmit={handlePostMessage}>
            <textarea
                placeholder="Write an awesome message..."
                className={style["app__chatbox"]}
                ref={messageRef}
                name="message"
            ></textarea>
            <button ref={buttonRef} className={style["app__chatbox-submit"]} onClick={ () => setTimeout(() => ChatBot(postMessage), 700)}><BsFillSendFill /></button>
        </form>
    );
};

export default Chatbox;

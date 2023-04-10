import React, { BaseSyntheticEvent, useRef } from "react";
import {BsFillSendFill} from "react-icons/bs"
import style from "./Chatbox.module.scss";
const Chatbox = ({
    messages,
    postMessage,
}: {
    messages: Message[];
    postMessage: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
    const messageRef = useRef<HTMLTextAreaElement>(null)

    const createMessage = (sender: string, message: string) => {
        postMessage((messages) => [...messages, {sender: sender, message: message}]);
    };

    const handlePostMessage = (e: BaseSyntheticEvent) => {
        e.preventDefault()
        createMessage("user", messageRef.current!.value)
        messageRef.current!.value = "";

    }
    return (
        <form onSubmit={handlePostMessage}>
            <textarea
                placeholder="Write an awesome message..."
                className={style["app__chatbox"]}
                ref={messageRef}
                name="message"
            ></textarea>
            <button className={style["app__chatbox-submit"]}><BsFillSendFill /></button>
        </form>
    );
};

export default Chatbox;

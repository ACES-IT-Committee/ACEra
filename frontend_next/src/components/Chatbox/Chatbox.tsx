import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { FaKissWinkHeart, FaSmileWink } from "react-icons/fa";
import { AiFillSmile } from "react-icons/ai";
import style from "./Chatbox.module.scss";
import { motion } from "framer-motion";

const buttonVariants = {
    circular: { borderRadius: "50%", height: "3rem" },
    rectangular: { borderRadius: "30px", height: "15vh" },
};

const treats = [
    "Thanks for your response! 😊",
    "Today is really beautiful 🌞",
    "You are doing great! 👏",
    "You are fun to talk to! 🗣️",
    "You have a lot of potential! 💯",
    "You are awesome! 🙌",
    "You are amazing! 🌈 Have a nice day ✨",
];
const iconTreats = [<FaKissWinkHeart />, <FaSmileWink />, <AiFillSmile />];
const Chatbox = ({
    postMessage,
    action,
    requestReply,
    isDisabled,
    setIsChatDisabled,
    isChatDone,
}: {
    postMessage: React.Dispatch<React.SetStateAction<Message[]>>;
    action?: () => void;
    requestReply?: (
        lastUserMessage: Message,
        postMessage: React.Dispatch<React.SetStateAction<Message[]>>,
        setIsChatDisabled: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    isDisabled: boolean;
    setIsChatDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    isChatDone: boolean;
}) => {
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [boxFocused, setBoxFocused] = useState(false);
    const [treatIndex, setTreatIndex] = useState(0);

    const createMessage = ({ sender, message }: Message) => {
        postMessage((messages) => [
            ...messages,
            { sender: sender, message: message },
        ]);
    };

    const handlePostMessage = () => {
        createMessage({ sender: "user", message: messageRef.current!.value });
        messageRef.current!.value = "";
    };

    useEnterSend(messageRef, buttonRef);
    return (
        <div>
            <textarea
                className={style["app__chatbox"]}
                placeholder={
                    !isDisabled
                        ? "Write an awesome message..."
                        : treats[treatIndex % treats.length]
                }
                ref={messageRef}
                name="message"
                disabled={isChatDone}
                onFocus={() => setBoxFocused(true)}
                onBlur={() => setBoxFocused(false)}
            ></textarea>
            <motion.button
                className={style["app__chatbox-submit"]}
                ref={buttonRef}
                onClick={() => {
                    requestReply!( //request reply to last user message
                    { sender: "user", message: messageRef.current!.value },
                    postMessage,
                    setIsChatDisabled
                );
                    handlePostMessage(); //post user message

                    !isDisabled && setTreatIndex((prevIndex) => prevIndex + 1); //increment textarea placeholder
                }}
                animate={!boxFocused || isChatDone ? "circular" : "rectangular"}
                variants={buttonVariants}
                disabled={isDisabled}
                style={isChatDone ? { fontSize: "x-large" } : {}}
            >
                {isChatDone ? (
                    iconTreats[Math.floor(Math.random() * iconTreats.length)]
                ) : (
                    <BsFillSendFill />
                )}
            </motion.button>
        </div>
    );
};

export default Chatbox;

const useEnterSend = (
    messageRef: React.RefObject<HTMLTextAreaElement>,
    buttonRef: React.RefObject<HTMLButtonElement>
) => {
    useEffect(() => {
        messageRef.current?.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.code === "Enter") {
                e.preventDefault();
                buttonRef.current?.click();
            }
        });
    }, []);
};

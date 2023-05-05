import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { FaKissWinkHeart, FaSmileWink } from "react-icons/fa";
import { AiFillSmile } from "react-icons/ai";
import style from "./Chatbox.module.scss";
import { motion } from "framer-motion";

const buttonVariants = {
    circular: { borderRadius: "50%", height: "3rem" },
    rectangular: { borderRadius: "30px", height: "9vh" },
};

const treats = [
    "Today is really beautiful 🌞",
    "Thanks for that! 😊",
    "You are doing great! 👏",
    "Sounds Good. 👍",
    "Awesome! 🌟",
    "You are fun to talk to! 🗣️",
    "You have a lot of potential! 💯",
    "You are awesome! 🙌",
    "You are amazing! 🌈 Have a nice day ✨",

];
const iconTreats = [<FaKissWinkHeart />, <FaSmileWink />, <AiFillSmile />];
const Chatbox = ({
    postMessage,
    requestReply,
    isChatDone,
}: {
    postMessage: React.Dispatch<React.SetStateAction<Message[]>>;
    requestReply?: (
        lastUserMessage: Message,
        postMessage: React.Dispatch<React.SetStateAction<Message[]>>
    ) => void;
    isChatDone: boolean;
}) => {
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isChatPaused, setIsChatPaused] = useState(false);
    const [boxFocused, setBoxFocused] = useState(false);
    const [treatIndex, setTreatIndex] = useState(-1);
    const [isEmptyWarn, setIsEmptyWarn] = useState(false);

    const handlePostUserMessage = () => {
        setTimeout(() => {
            postMessage((messages) => [
                ...messages,
                { sender: "user", message: messageRef.current!.value },
            ]);
            messageRef.current!.value = "";
        }, 50);
    };

    useEnterSend(messageRef, buttonRef);
    return (
        <div className={style["app__chatbox"]}>
            <textarea
                placeholder={
                    isEmptyWarn
                        ? "You don't want to write an awesome message? 🫤"
                        : isChatPaused || isChatDone
                        ? treats[treatIndex % treats.length]
                        : "Write an awesome message..."
                }
                ref={messageRef}
                name="message"
                disabled={isChatDone}
                onFocus={(e) => {
                    setBoxFocused(true);
                    e.preventDefault();
                }}
                onBlur={() => {
                    setBoxFocused(false);
                }}
            ></textarea>
            <motion.button
                className={style["app__chatbox-submit"]}
                ref={buttonRef}
                onClick={() => {
                    messageRef.current?.focus();
                    if (messageRef.current?.value.length != 0) {
                        pauseChat(setIsChatPaused);
                        handlePostUserMessage(); //post user message
                        requestReply!(
                            //request reply to last user message
                            {
                                sender: "user",
                                message: messageRef.current!.value,
                            },
                            postMessage
                        );
                        !isChatPaused &&
                            !isChatDone &&
                            setTreatIndex((prevIndex) => prevIndex + 1); //increment textarea placeholder
                    } else {
                        setIsEmptyWarn(true);
                        setTimeout(() => {
                            setIsEmptyWarn(false);
                        }, 1300);
                    }
                }}
                animate={!boxFocused || isChatDone ? "circular" : "rectangular"}
                variants={buttonVariants}
                disabled={isChatPaused || isChatDone}
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

const pauseChat = (
    setIsChatPaused: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setIsChatPaused(true);
    setTimeout(() => {
        setIsChatPaused(false);
    }, 1000);
};

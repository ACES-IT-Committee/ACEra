import React, { useEffect, useRef, useState } from "react";
import style from "./ChatArea.module.scss";
import { Chatbox, Message } from "@/components";
import images from "@/constants/images";
import ChatBot from "@/services/ChatBot";

const ChatArea = () => {
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [disableChat, setDisableChat] = useState(false);
    const [data, setData] = useState<Data>({
        name: "",
        email: "",
        phone: "",
        school: "",
        major: "",
        gradYear: "",
        experience: "",
        workshops: [],
    });

    useScrollToChatBottom(chatEndRef, messages);
    useStartChatBot(setMessages);
    useGetData(messages, setData);
    if (messages.length == 19) {
        useSendData(data);
        setDisableChat(true);
    }

    return (
        <div className={style["app__chat_area"]}>
            <img src={images.aces.src} />
            {messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
            <Chatbox disabled={disableChat} postMessage={setMessages} />
            <div ref={chatEndRef} />
        </div>
    );
};

export default ChatArea;

const useScrollToChatBottom = (
    chatEndRef: React.RefObject<HTMLDivElement>,
    messages: Message[]
) => {
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
};

const useStartChatBot = (
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
    useEffect(() => {
        ChatBot(setMessages);
    }, []);
};

const useGetData = (
    messages: Message[],
    setData: React.Dispatch<React.SetStateAction<Data>>
) => {
    const getWorkShops = (workshops: string): number[] => {
        const wsList = workshops.split(",");
        const wsNumberdList: number[] = [];
        wsList.forEach((ws) => {
            wsNumberdList.push(parseInt(ws));
        });
        return wsNumberdList;
    };
    useEffect(() => {
        const chatData: ChatData = {
            name: "",
            email: "",
            phone: "",
            school: "",
            major: "",
            gradYear: "",
            experience: "",
            workshops: "",
        };

        if (messages.length == 19) {
            let i = 3; //index of name message by user
            for (const prop in chatData) {
                chatData[prop as keyof Data] = messages[i]!.message;
                i += 2;
            }

            setData({
                name: chatData.name,
                email: chatData.email,
                phone: chatData.phone,
                school: chatData.school,
                major: chatData.major,
                gradYear: chatData.gradYear,
                experience: chatData.experience,
                workshops: getWorkShops(chatData.workshops),
            });
        }
    }, [messages]);
};

const useSendData = (data: Data) => {
    data.name && console.log(data);
};

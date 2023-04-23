import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import style from "./ChatArea.module.scss";
import { Chatbox, Message } from "@/components";
import images from "@/constants/images";
import Chatbot from "@/services/ChatBot/ChatBot";

const chatbot = new Chatbot();

const ChatArea = () => {
    const chatBottomRef = useRef<HTMLDivElement>(null);
    const [isChatDisabled, setIsChatDisabled] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [data, setData] = useState<Data>({
        name: "",
        email: "",
        phone: "",
        school: "",
        major: "",
        gradYear: "",
        experience: "",
        workshops: "",
    });
    useScrollToChatBottom(chatBottomRef, messages);
    useInitBot(setMessages);
    useGetData(messages, setData, data);
    useSendData(data, setIsChatDisabled);
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

// Deal with data
// a. extract data from user messages
const useGetData = (
    messages: Message[],
    setData: React.Dispatch<React.SetStateAction<Data>>,
    data: Data
) => {
    const getProps = useMemo(() => {
        const props: (keyof Data)[] = [];
        for (const prop in data) props.push(prop as keyof Data);
        return props;
    }, []);
    useEffect(() => {
        chatbot.isDataGetable &&
            setData((prevData) => {
                const newData = { ...prevData };
                newData[
                    getProps[chatbot.currentIndex + chatbot.userIndexOffset]
                ] =
                    messages[
                        messages.length - 2 //get last validated user message
                    ]!.message;
                return newData;
            });
        console.log(chatbot.currentIndex);
    }, [chatbot.currentIndex]);
};
// b. send data to api
const useSendData = (
    data: Data,
    setIsChatDisabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
    useEffect(() => {
        chatbot.isDataDone && console.log(data);
        chatbot.isDataDone && setIsChatDisabled(true);
    }, [data]);
};

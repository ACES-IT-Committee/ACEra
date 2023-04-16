const botMessages = [
    //Introduction
    [
        {
            sender: "bot",
            message:
                "Hello and welcome to ACES! I’m ACEra, a chatbot for ACES. I’m here to help you register for our amazing workshops that will boost your skills and prepare you for the engineering world. Are you ready to join us? 😊",
        },
        { sender: "bot", message: "I'm good, thanks." },
        { sender: "bot", message: "Just browsing the web." },
        { sender: "bot", message: "Not really." },
        { sender: "bot", message: "Sure, why not?" },
        { sender: "bot", message: "Well, I'm a student." },
        { sender: "bot", message: "Computer science." },
        {
            sender: "bot",
            message: "Nice. What kind of projects do you work on?",
        },
        {
            sender: "bot",
            message: "That sounds fun. Do you use any frameworks?",
        },
        {
            sender: "bot",
            message: "I've heard of those. They're popular, right?",
        },
    ],
    // Name
    // Email
    // Phone
    // School
    // Major
    // Graduation Year
    // Experience
    // Workshops
];
const ChatBot = (
    postMessage: React.Dispatch<React.SetStateAction<Message[]>>
) => {
    console.log(botMessages.length);
    postMessage((messages) => [
        ...messages,
        botMessages[messages.length == 0 ? 0 : messages.length - 1][
            Math.floor(
                Math.random() *
                    botMessages[messages.length == 0 ? 0 : messages.length - 1]
                        .length
            )
        ],
    ]);
};

export default ChatBot;

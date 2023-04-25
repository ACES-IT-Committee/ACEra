import * as yup from "yup";

// user data to be fetched
const userData: Data = {
    name: "",
    email: "fjfj@ff.com",
    phone: "",
    school: "",
    major: "",
    gradYear: 0,
    experience: "",
    workshops: [0],
};

const botMessages: {
    intros: Message[];
    questions: Record<keyof Data, (userData: Data) => Array<Message>>;
    outros: Message[];
    verifications: (userData: Data) => Message[];
    errors: Record<string, Array<Message>>;
} = {
    intros: [
        {
            sender: "bot",
            message:
                "Greetings and welcome to ACES! 🙌<br><br>My name is ACEra and I'm a chatbot for ACES. 🤖<br><br>I'm here to assist you with registering for our awesome workshops that will enhance your abilities and get you ready for the engineering world. 🚀<br><br>Do you want to join us? 😊",
        },

        {
            sender: "bot",
            message:
                "Hi and welcome to ACES! 👋<br><br>I'm ACEra, a chatbot for ACES. 🤖<br><br>I'm here to help you sign up for our amazing workshops that will improve your skills and equip you for the engineering world. 🚀<br><br>Are you excited to join us? 😊",
        },

        {
            sender: "bot",
            message:
                "Hello and welcome to ACES! 👋<br><br>I'm ACEra and I'm a chatbot for ACES. 🤖<br><br>I'm here to support you with enrolling for our awesome workshops that will develop your skills and prepare you for the engineering world. 🚀<br><br>Are you eager to join us? 😊",
        },

        {
            sender: "bot",
            message:
                "Greetings and welcome to ACES! 🙌<br><br>My name is ACEra and I'm a chatbot for ACES. 🤖<br><br>I'm here to guide you with registering for our amazing workshops that will boost your skills and ready you for the engineering world. 🚀<br><br>Are you keen to join us? 😊",
        },
    ],
    questions: {
        name: (_userData: Data) => [
            {
                sender: "bot",
                message:
                    "First of all, I need to know some basic information. 📝<br><br>How do you call yourself? 🤔",
            },

            {
                sender: "bot",
                message:
                    "Before we proceed, I have to ask you some basic information. 📝<br><br>What is the name you go by? 🤔",
            },

            {
                sender: "bot",
                message:
                    "To begin with, I require some basic information. 📝<br><br>How do you identify yourself? 🤔",
            },

            {
                sender: "bot",
                message:
                    "As a start, I want to get some basic information. 📝<br><br>What is the name you use? 🤔",
            },

            {
                sender: "bot",
                message:
                    "For starters, I request some basic information. 📝<br><br>How do you introduce yourself? 🤔",
            },
        ],

        email: (_userData: Data) => [
            {
                sender: "bot",
                message: `Hi ${userData.name}! I would like to stay in touch with you via email. 📧<br><br>What is your email address? 🤔`,
            },

            {
                sender: "bot",
                message: `Hi ${userData.name}! I appreciate your interest in this opportunity. 👍<br><br>What is the best email to reach you at? 🤔`,
            },

            {
                sender: "bot",
                message: `Hi ${userData.name}! I'm glad you are here today. 😊<br><br>What is the email address you use most often? 🤔`,
            },

            {
                sender: "bot",
                message: `Hi ${userData.name}! I hope you are enjoying this conversation. 😊<br><br>What is your preferred email for communication? 🤔`,
            },

            {
                sender: "bot",
                message: `Hi ${userData.name}! I value your time and attention. 👏<br><br>What is the email address you check regularly? 🤔`,
            },
        ],

        phone: (_userData: Data) => [
            {
                sender: "bot",
                message:
                    "I would like to keep you updated on the status of your request. 📲<br><br>What is your phone number to send you updates? 🤔",
            },

            {
                sender: "bot",
                message:
                    "I'm grateful for your patience and understanding. 🙏<br><br>What is the best number to text you with updates on your request? 🤔",
            },

            {
                sender: "bot",
                message:
                    "I want to make sure you are informed and satisfied. 😊<br><br>What is the phone number you use for receiving updates? 🤔",
            },

            {
                sender: "bot",
                message:
                    "I hope you are doing well and staying safe. 😊<br><br>What is your preferred number to get updates on your request? 🤔",
            },

            {
                sender: "bot",
                message:
                    "I care about the quality of your experience. 👍<br><br>What is the phone number you feel comfortable receiving updates from me? 🤔",
            },
        ],

        school: (_userData: Data) => [
            {
                sender: "bot",
                message:
                    "I'm happy for you that you are pursuing higher education. 🎓<br><br>What is the name of the college you are attending? 🤔",
            },

            {
                sender: "bot",
                message:
                    "I'm proud of you for following your academic dreams. 🎓<br><br>What is the college you are enrolled in? 🤔",
            },

            {
                sender: "bot",
                message:
                    "I'm excited for you that you are exploring new opportunities. 🎓<br><br>What is the college you are studying at? 🤔",
            },

            {
                sender: "bot",
                message:
                    "I'm impressed by your dedication and ambition. 🎓<br><br>What is the college you are affiliated with? 🤔",
            },

            {
                sender: "bot",
                message:
                    "I'm curious about your educational journey. 🎓<br><br>What is the college you are going to? 🤔",
            },
        ],

        major: (_userData: Data) => [
            {
                sender: "bot",
                message: `That's amazing! ${userData.school} is so prestigious. 🏫<br><br>I've heard great things about their courses and resources. 📚<br><br>I wonder what you're learning there. 🤔<br><br>What's your major? 🎓`,
            },

            {
                sender: "bot",
                message: `That's incredible! ${userData.school} is very impressive. 🏫<br><br>I've always been interested in their offerings and opportunities. 📚<br><br>I'd love to know what you're studying there. 🤔<br><br>What's your major? 🎓`,
            },

            {
                sender: "bot",
                message: `That's fantastic! ${userData.school} is awesome. 🏫<br><br>I've seen their achievements and facilities. 📚<br><br>I'm eager to know what you're pursuing there. 🤔<br><br>What's your major? 🎓`,
            },

            {
                sender: "bot",
                message: `That's wonderful! ${userData.school} is excellent. 🏫<br><br>I've read about their quality and diversity. 📚<br><br>I'm keen to know what you're exploring there. 🤔<br><br>What's your major? 🎓`,
            },

            {
                sender: "bot",
                message: `That's splendid! ${userData.school} is outstanding. 🏫<br><br>I've admired their reputation and innovation. 📚<br><br>I'm curious to know what you're focusing on there. 🤔<br><br>What's your major? 🎓`,
            },
        ],

        gradYear: (_userData: Data) => [
            {
                sender: "bot",
                message: `I'm impressed by your choice of ${userData.major}. 🙌<br><br>It sounds very challenging and rewarding. 💯<br><br>When do you expect to graduate with your degree? 🎓`,
            },

            {
                sender: "bot",
                message: `I'm fascinated by your ${userData.major}. 🙌<br><br>It seems very interesting and relevant. 💯<br><br>What is your anticipated graduation year for your program? 🎓`,
            },

            {
                sender: "bot",
                message: `I'm intrigued by your ${userData.major}. 🙌<br><br>It looks very exciting and meaningful. 💯<br><br>When will you complete your studies in your field? 🎓`,
            },

            {
                sender: "bot",
                message: `I'm amazed by your ${userData.major}. 🙌<br><br>It appears very demanding and fulfilling. 💯<br><br>What is your expected graduation date for your course? 🎓`,
            },

            {
                sender: "bot",
                message: `I'm astonished by your ${userData.major}. 🙌<br><br>It sounds very complex and valuable. 💯<br><br>When are you going to graduate with your qualification? 🎓`,
            },
        ],

        experience: (_userData: Data) => [
            {
                sender: "bot",
                message: `I'm keen to know more about your student life and achievements, ${userData.name}. 🙌<br><br>You seem like a very involved and inventive person. 👏<br><br>Tell me more about the activities, events, workshops, projects, or internships that you've joined in. 🤔`,
            },

            {
                sender: "bot",
                message: `I'm eager to learn more about your student life and achievements, ${userData.name}. 🙌<br><br>You seem like a very committed and original person. 👏<br><br>Tell me more about the activities, events, workshops, projects, or internships that you've taken part in. 🤔`,
            },

            {
                sender: "bot",
                message: `I'm excited to hear more about your student life and achievements, ${userData.name}. 🙌<br><br>You seem like a very dedicated and creative person. 👏<br><br>Tell me more about the activities, events, workshops, projects, or internships that you've engaged in. 🤔`,
            },

            {
                sender: "bot",
                message: `I'm curious to find out more about your student life and achievements, ${userData.name}. 🙌<br><br>You seem like a very active and innovative person. 👏<br><br>Tell me more about the activities, events, workshops, projects, or internships that you've been part of. 🤔`,
            },

            {
                sender: "bot",
                message: `I'm enthusiastic to discover more about your student life and achievements, ${userData.name}. 🙌<br><br>You seem like a very passionate and imaginative person. 👏<br><br>Tell me more about the activities, events, workshops, projects, or internships that you've contributed to. 🤔`,
            },
        ],

        workshops: (_userData: Data) => [
            {
                sender: "bot",
                message: `I'm glad you are interested in applying for our workshops. We have two options available: CV writing and project management. Which one would you like to apply for? <br><br>CV writing: This workshop will help you craft a professional and effective CV that showcases your skills and achievements.<br><br>Project management: This workshop will teach you the basics of project management, such as planning, organizing, leading and controlling.`,
            },
        ],
    },
    outros: [
        {
            sender: "bot",
            message:
                "Awesome!👌. Thanks for your collaboration 🤝. You will here from us soon on your email. ✉️",
        },
    ],
    verifications: (userData) => [
        {
            sender: "bot",
            message: `Awesome! 😍 You're all done. I'm so happy to meet you <p>${
                userData.name
            }</p> 🙌 <span>1</span>. Your email is <p>${
                userData.email
            }</p> 📧 <span>2</span>, and your phone number is <p>${
                userData.phone
            }</p> 📱 <span>3</span>. You are studying at <p>${
                userData.school
            }</p> 🎓 <span>4</span>, majoring in <p>${
                userData.major
            }</p> 💯 <span>5</span>. You will graduate in <p>${
                userData.gradYear
            }</p> 🎉 <span>6</span>. You have done many amazing things: <p>${userData.experience.slice(
                0,
                15
            )}</p>...👏 <span>7</span>, and you are interested in workshops <p>${
                userData.workshops
            }</p> 🚀 <span>8</span>. Is this all correct? If you want to change anything, just type the number next to it.`,
        },
    ],
    errors: {
        email: [
            {
                sender: "bot",
                message:
                    "Ops! 🫤. It seems that the email you entered already exists. Please enter another email.",
            },
        ],
        unknown: [
            {
                sender: "bot",
                message: "Something wrong happened! 😵. Don't worry, you restart by reloading the page 🔄️. Communicate with an IT member if you need further assistance. 🧑‍💻"
            }
        ]
    },
};
const validationSchema = yup.object({
    name: yup
        .string()
        .max(
            20,
            "Oops, your name is too long 😅. Please enter a name that is 20 characters or less 🙏."
        )
        .required(
            "I really want to get to know you 🥺. Please tell me your name 🫤"
        )
        .matches(
            /^[a-zA-Z\s'-]+$/,
            "Hmm, that doesn't look like a valid name 🤔. Please enter a name that only has letters, spaces, hyphens, and apostrophes 🙌."
        ),
    email: yup
        .string()
        .email(
            "Oops, that doesn't look like a valid email 😅. Please enter an email address that follows the format username@domain.com 🙏."
        )
        .max(
            255,
            "Oops, your email is too long 😅. Please enter an email that is 255 characters or less 🙏."
        )
        .required(
            "I really want to get in touch with you 🥺. Please tell me your email 🫤"
        ),
    phone: yup
        .string()
        .matches(
            /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/,
            "Oops, that doesn't look like a valid phone number 😅. Please enter a phone number that has 10 digits and follows the format (000) 000-0000 or 000-000-0000 🙏."
        )
        .min(
            10,
            "Oops, your phone number is too short 😅. Please enter a phone number that has 10 digits 🙏."
        )
        .max(
            14,
            "Oops, your phone number is too long 😅. Please enter a phone number that has 10 digits 🙏."
        )
        .required(
            "I really want to hear your voice 🥺. Please tell me your phone number 🫤"
        ),
    school: yup
        .string()
        .matches(
            /^[a-zA-Z\s.,]+$/,
            "Oops, that doesn't look like a valid school name 😅. Please enter a school name that only has letters, spaces, periods, and commas 🙏."
        )
        .max(
            100,
            "Oops, your school name is too long 😅. Please enter a school name that is 100 characters or less 🙏."
        )
        .required(
            "I really want to know where you study 🥺. Please tell me your school name 🫤"
        ),
    major: yup
        .string()
        .matches(
            /^[a-zA-Z\s/-]+$/,
            "Oops, that doesn't look like a valid major name 😅. Please enter a major name that only has letters, spaces, hyphens, and slashes 🙏."
        )
        .max(
            50,
            "Oops, your major name is too long 😅. Please enter a major name that is 50 characters or less 🙏."
        )
        .required(
            "I really want to know what you are passionate about 🥺. Please tell me your major name 🫤"
        ),
    gradYear: yup
        .number()
        .typeError(
            "Oops, that doesn't look like a valid graduation year 😅. Please enter a graduation year that has four digits and is between 2020 and 2030 🙏."
        )
        .integer(
            "Oops, that doesn't look like a valid graduation year 😅. Please enter a graduation year that has four digits and is between 2020 and 2030 🙏."
        )
        .min(
            2020,
            "Oops, that doesn't look like a valid graduation year 😅. Please enter a graduation year that has four digits and is between 2020 and 2030 🙏."
        )
        .max(
            2030,
            "Oops, that doesn't look like a valid graduation year 😅. Please enter a graduation year that has four digits and is between 2020 and 2030 🙏."
        ),
    experience: yup
        .string()
        .matches(
            /^[a-zA-Z\s,.0-9!@#$%^&*()_+-=]*$/,
            "Oops, that doesn't look like a valid experience description 😅. Please enter an experience description that only has letters, spaces, commas, periods, numbers, and symbols 🙏."
        )
        .max(
            500,
            "Oops, your experience description is too long 😅. Please enter an experience description that is 500 characters or less 🙏."
        )
        .required(
            "I really want to know what you have achieved 🥺. Please tell me your experience description 🫤"
        ),
    workshops: yup
        .array()
        .of(
            yup
                .number()
                .typeError(
                    "Oops, that doesn't look like a valid workshop number 😅. Please enter a workshop number that is positive 🙏."
                )
                .positive(
                    "Oops, that doesn't look like a valid workshop number 😅. Please enter a workshop number that is positive 🙏."
                )
                .max(
                    5,
                    "Oops, that doesn't look like a valid workshop number 😅. Please enter a workshop number that is less than or equal to 5 🙏."
                )
        )
        .min(
            1,
            "Oops, you need to select at least one workshop 😅. Please enter a comma-separated list of workshop numbers 🙏."
        )
        .max(
            3,
            "Oops, you can only select up to three workshops 😅. Please enter a comma-separated list of workshop numbers 🙏."
        )
        .required(
            "I really want to know what you are interested in learning 🥺. Please tell me your workshop numbers 🫤"
        ),
});

const props: (keyof Data)[] = [];
for (const prop in validationSchema.fields) props.push(prop as keyof Data);

const processingMethods: Record<keyof Data, (arg: string) => unknown> = {
    name: (input: string): string => input,
    email: (input: string): string => input,
    phone: (input: string): string => input,
    school: (input: string): string => input,
    major: (input: string): string => input,
    experience: (input: string): string => input,
    gradYear: (input: string): number => parseInt(input),
    workshops: (workshops: string): number[] => {
        let wsList: (number | string)[] = workshops.split(",");
        wsList.forEach((ws, index) => {
            wsList[index] = parseInt(ws as string);
        });
        return wsList as number[];
    },
};

const validateforDB = (errMsg: unknown): {todo: keyof validateforDBTodo, messagesForCurrentErr: Message[], field?: keyof Data} => {
    if (errMsg == "INVALID_EMAIL") {
        return {todo: "ASK", messagesForCurrentErr: botMessages.errors.email, field: "email" }
    } else if (errMsg === "UNKNOWN_ERROR") {
        return {todo: "RUN", messagesForCurrentErr: botMessages.errors.unknown}
    } else {
        return {todo: "CLOSE", messagesForCurrentErr: botMessages.outros}
    }
};


const formAPIEndpoint = "";
const botConfig = {
    validationSchema,
    props,
    processingMethods,
    userData,
    botMessages,
    formAPIEndpoint,
    validateforDB,
};

export default botConfig;

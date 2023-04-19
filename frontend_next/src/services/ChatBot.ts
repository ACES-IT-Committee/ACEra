const botMessages = [
    //Introduction
    [
        {
            sender: "bot",
            message: "Greetings and welcome to ACES! 🙌<br><br>My name is ACEra and I'm a chatbot for ACES. 🤖<br><br>I'm here to assist you with registering for our awesome workshops that will enhance your abilities and get you ready for the engineering world. 🚀<br><br>Do you want to join us? 😊"
          },
          
          {
            sender: "bot",
            message: "Hi and welcome to ACES! 👋<br><br>I'm ACEra, a chatbot for ACES. 🤖<br><br>I'm here to help you sign up for our amazing workshops that will improve your skills and equip you for the engineering world. 🚀<br><br>Are you excited to join us? 😊"
          },
          
          {
            sender: "bot",
            message: "Hello and welcome to ACES! 👋<br><br>I'm ACEra and I'm a chatbot for ACES. 🤖<br><br>I'm here to support you with enrolling for our awesome workshops that will develop your skills and prepare you for the engineering world. 🚀<br><br>Are you eager to join us? 😊"
          },
          
          {
            sender: "bot",
            message: "Greetings and welcome to ACES! 🙌<br><br>My name is ACEra and I'm a chatbot for ACES. 🤖<br><br>I'm here to guide you with registering for our amazing workshops that will boost your skills and ready you for the engineering world. 🚀<br><br>Are you keen to join us? 😊"
          }
    ],
    // Name
    [
        {
            sender: "bot",
            message: "First of all, I need to know some basic information. 📝<br><br>How do you call yourself? 🤔"
          },
          
          {
            sender: "bot",
            message: "Before we proceed, I have to ask you some basic information. 📝<br><br>What is the name you go by? 🤔"
          },
          
          {
            sender: "bot",
            message: "To begin with, I require some basic information. 📝<br><br>How do you identify yourself? 🤔"
          },
          
          {
            sender: "bot",
            message: "As a start, I want to get some basic information. 📝<br><br>What is the name you use? 🤔"
          },
          
          {
            sender: "bot",
            message: "For starters, I request some basic information. 📝<br><br>How do you introduce yourself? 🤔"
          }
    ],
    // Email
    [
        {
            sender: "bot",
            message: "I would like to stay in touch with you via email. 📧<br><br>What is your email address? 🤔"
          },
          
          {
            sender: "bot",
            message: "I appreciate your interest in this opportunity. 👍<br><br>What is the best email to reach you at? 🤔"
          },
          
          {
            sender: "bot",
            message: "I'm glad you are here today. 😊<br><br>What is the email address you use most often? 🤔"
          },
          
          {
            sender: "bot",
            message: "I hope you are enjoying this conversation. 😊<br><br>What is your preferred email for communication? 🤔"
          },
          
          {
            sender: "bot",
            message: "I value your time and attention. 👏<br><br>What is the email address you check regularly? 🤔"
          }
    ],
    // Phone
    [
        {
            sender: "bot",
            message: "I would like to keep you updated on the status of your request. 📲<br><br>What is your phone number to send you updates? 🤔"
          },
          
          {
            sender: "bot",
            message: "I'm grateful for your patience and understanding. 🙏<br><br>What is the best number to text you with updates on your request? 🤔"
          },
          
          {
            sender: "bot",
            message: "I want to make sure you are informed and satisfied. 😊<br><br>What is the phone number you use for receiving updates? 🤔"
          },
          
          {
            sender: "bot",
            message: "I hope you are doing well and staying safe. 😊<br><br>What is your preferred number to get updates on your request? 🤔"
          },
          
          {
            sender: "bot",
            message: "I care about the quality of your experience. 👍<br><br>What is the phone number you feel comfortable receiving updates from me? 🤔"
          }
    ],
    // School
    [
        {
            sender: "bot",
            message: "I'm happy for you that you are pursuing higher education. 🎓<br><br>What is the name of the college you are attending? 🤔"
          },
          
          {
            sender: "bot",
            message: "I'm proud of you for following your academic dreams. 🎓<br><br>What is the college you are enrolled in? 🤔"
          },
          
          {
            sender: "bot",
            message: "I'm excited for you that you are exploring new opportunities. 🎓<br><br>What is the college you are studying at? 🤔"
          },
          
          {
            sender: "bot",
            message: "I'm impressed by your dedication and ambition. 🎓<br><br>What is the college you are affiliated with? 🤔"
          },
          
          {
            sender: "bot",
            message: "I'm curious about your educational journey. 🎓<br><br>What is the college you are going to? 🤔"
          }
    ],
    // Major
    [
        {
            sender: "bot",
            message: "That’s amazing! Your school is so prestigious. 🏫<br><br>I’ve heard great things about their courses and resources. 📚<br><br>I wonder what you’re learning there. 🤔<br><br>What’s your major? 🎓"
          },
          
          {
            sender: "bot",
            message: "That’s incredible! Your school is very impressive. 🏫<br><br>I’ve always been interested in their offerings and opportunities. 📚<br><br>I’d love to know what you’re studying there. 🤔<br><br>What’s your major? 🎓"
          },
          
          {
            sender: "bot",
            message: "That’s fantastic! Your school is awesome. 🏫<br><br>I’ve seen their achievements and facilities. 📚<br><br>I’m eager to know what you’re pursuing there. 🤔<br><br>What’s your major? 🎓"
          },
          
          {
            sender: "bot",
            message: "That’s wonderful! Your school is excellent. 🏫<br><br>I’ve read about their quality and diversity. 📚<br><br>I’m keen to know what you’re exploring there. 🤔<br><br>What’s your major? 🎓"
          },
          
          {
            sender: "bot",
            message: "That’s splendid! Your school is outstanding. 🏫<br><br>I’ve admired their reputation and innovation. 📚<br><br>I’m curious to know what you’re focusing on there. 🤔<br><br>What’s your major? 🎓"
          }
    ],
    // Graduation Year
    [
        {
            sender: "bot",
            message: "I’m impressed by your choice of major. 🙌<br><br>It sounds very challenging and rewarding. 💯<br><br>When do you expect to graduate with your degree? 🎓"
          },
          
          {
            sender: "bot",
            message: "I’m fascinated by your major. 🙌<br><br>It seems very interesting and relevant. 💯<br><br>What is your anticipated graduation year for your program? 🎓"
          },
          
          {
            sender: "bot",
            message: "I’m intrigued by your major. 🙌<br><br>It looks very exciting and meaningful. 💯<br><br>When will you complete your studies in your field? 🎓"
          },
          
          {
            sender: "bot",
            message: "I’m amazed by your major. 🙌<br><br>It appears very demanding and fulfilling. 💯<br><br>What is your expected graduation date for your course? 🎓"
          },
          
          {
            sender: "bot",
            message: "I’m astonished by your major. 🙌<br><br>It sounds very complex and valuable. 💯<br><br>When are you going to graduate with your qualification? 🎓"
          }
    ],
    // Experience
    [
        {
            sender: "bot",
            message: "I’m keen to know more about your student life and achievements. 🙌<br><br>You seem like a very involved and inventive person. 👏<br><br>Tell me more about the activities, events, workshops, projects, or internships that you’ve joined in. 🤔"
          },
          
          {
            sender: "bot",
            message: "I’m eager to learn more about your student life and achievements. 🙌<br><br>You seem like a very committed and original person. 👏<br><br>Tell me more about the activities, events, workshops, projects, or internships that you’ve taken part in. 🤔"
          },
          
          {
            sender: "bot",
            message: "I’m excited to hear more about your student life and achievements. 🙌<br><br>You seem like a very dedicated and creative person. 👏<br><br>Tell me more about the activities, events, workshops, projects, or internships that you’ve engaged in. 🤔"
          },
          
          {
            sender: "bot",
            message: "I’m curious to find out more about your student life and achievements. 🙌<br><br>You seem like a very active and innovative person. 👏<br><br>Tell me more about the activities, events, workshops, projects, or internships that you’ve been part of. 🤔"
          },
          
          {
            sender: "bot",
            message: "I’m enthusiastic to discover more about your student life and achievements. 🙌<br><br>You seem like a very passionate and imaginative person. 👏<br><br>Tell me more about the activities, events, workshops, projects, or internships that you’ve contributed to. 🤔"
          }
    ],
    // Workshops
    [
        {
            sender: "bot",
            message: "I’m glad you are interested in applying for our workshops. We have two options available: CV writing and project management. Which one would you like to apply for? <br><br>CV writing: This workshop will help you craft a professional and effective CV that showcases your skills and achievements.<br><br>Project management: This workshop will teach you the basics of project management, such as planning, organizing, leading and controlling."
        }
    ],
    // Closing
    [
        {
            sender: "bot",
            message: "Awesome!👌. Thanks for your collaboration 🤝. You will here from us soon on your email. ✉️"
        }
    ]
];

const ChatBot = (
    postMessage: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  postMessage((messages) => [
        ...messages,
        botMessages[Math.round(messages.length/2)][
            Math.floor(
                Math.random() *
                    botMessages[Math.round(messages.length/2)]
                        .length
            )
        ],
    ]);
};

export default ChatBot;

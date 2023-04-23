import * as yup from "yup";
import botConfig from "./ChatBotConfig";
class ChatBot {
    currentIndex = -1; //index of botMessages
    userIndexOffset = -2; //offset for index of user messages from index of bot Messages
    propsIndex = this.currentIndex - 1; //index for props of data
    currentProp = botConfig.props[this.propsIndex]; //current prop of data
    isDataGetable = this.currentIndex > 1; //is there is user data avalabile in chat
    isDataDone = this.currentIndex > botConfig.props.length; //is all of the data given
    isChatDone = this.isDataDone; //is it time to end the chat

    //initialize bot
    init = () => {
        return this.getMessage();
    };

    //validate processedInput
    validate = async <T>(processedInput: T): Promise<string> => {
        try {
            //try validation of processed input using validationSchema
            await botConfig.validationSchema.validateAt(this.currentProp, {
                [this.currentProp]: processedInput,
            });
            return "VALID";
        } catch (err: unknown) {
            //catch error from validationSchema
            console.log(err);
            if (err instanceof yup.ValidationError) return err.message;
            return err as string;
        }
    };

    //reply by processing the input, validating, and sending a message
    reply = async (lastUserMessage: Message): Promise<Message> => {
        if (this.currentIndex > 0) {
            //check if it is time for validation
            let processingMethod = botConfig.processingMethods[this.currentProp]; //get method for processing input for current prop
            type methodType = typeof processingMethod; //get method type
            type methodReturnType = ReturnType<methodType>; //get method return type

            let processedInput: methodReturnType = processingMethod(
                //process input
                lastUserMessage.message
            );

            const validationResult = await this.validate<methodReturnType>(
                processedInput
            );
            if (validationResult === "VALID") {
                //validate processd input
                return this.getMessage(); //get a bot message if validaiton passes
            } else {
                return this.getRequestion(validationResult); //requestion with validation error message
            }
        } else return this.getMessage(); //get a free bot message if it is not time to validate yet
    };

    //return current message from botMessages
    getMessage = (): Message => {
        this.currentIndex++; //update index from previous message to current  message
        this.isDataGetable = this.currentIndex > 1; //recheck for data avalability
        this.isDataDone = this.currentIndex > botConfig.props.length; //recheck if all data is present
        this.isChatDone = this.isDataDone; //recheck if the chat is finished
        this.propsIndex = this.currentIndex - 1; //update index of targeted prop of data
        this.currentProp = botConfig.props[this.propsIndex]; //update targeted prop of data
        const currentMessage = botConfig.botMessages[this.currentIndex]; //get bot's current message
        return currentMessage[ //send a random variaiton of the bot's current message
            Math.floor(Math.random() * currentMessage.length)
        ];
    };

    //reask the question
    getRequestion = (errorMessage: string): Message => {
        return { sender: "bot", message: errorMessage };
    };
}

export default ChatBot;

import * as yup from "yup";
import botConfig from "./FormChatbotConfig";
class ChatBot {
    currentIndex = -1; //index of botMessages

    // Data info
    userData: Data = botConfig.userData; //user data to get
    propsIndex = this.currentIndex - 1; //index for props of data
    currentProp = botConfig.props[this.propsIndex]; //current prop of data
    currentPropValue = this.userData[this.currentProp]; //current value of the current prop

    // States
    isDataGetable = this.currentIndex > 1; //is there user data avalabile in chat
    isDataDone = false; //is all of the data given
    isChatDone = false; //is it time to end the chat
    isAskedToVerify = false; //is user asked to verify
    isSolvingDBErrr = false; //is user ansewring question after db error

    startBot = (): Message => {
        this.currentIndex++;
        return this.getMessageVariationOf(botConfig.botMessages.intros);
    };

    //reply according to the current bot state
    reply = async (lastUserMessage: Message): Promise<Message> => {
        //reply with a free bot message if it is not time to validate yet
        if (this.currentIndex <= 0) return this.getNextBotMessage();

        //if we have the data, and we asked user for data verification
        if (this.isDataDone && this.isAskedToVerify) {
            this.isAskedToVerify = false; //reset ask-to-verify
            return await this.getQuestionToEditAnswer(lastUserMessage); //get verification question
        }

        //process input
        let processedInput = this.processInput(lastUserMessage);

        //validate processed input
        const validationResult = await this.validateProcessedInput<
            typeof processedInput
        >(processedInput);

        //check validation test status
        if (validationResult !== "VALID")
            return this.askToCheckAnswer(validationResult); //ask the user to check answer

        this.userData[this.currentProp] = processedInput as never; //update user data

        //if that answer was not for the last question, ask another question
        if (this.currentIndex !== botConfig.props.length)
            return this.getNextBotMessage();

        if (this.isSolvingDBErrr) {
            this.isSolvingDBErrr = false;
        }

        //if that answer was for the last question, then we have the data; ask user for data verification
        this.isDataDone = true;
        return this.askToVerify();
    };

    terminateChat = async (): Promise<Message> => {
        const response = await this.sendFormData();
        const dbValidationResult = botConfig.validateforDB(response);

        if (
            dbValidationResult.todo === "CLOSE" ||
            dbValidationResult.todo == "RUN"
        ) {
            this.isChatDone = true;
        } else if (dbValidationResult.todo === "ASK") {
            this.isSolvingDBErrr = true;
            this.currentProp = dbValidationResult.field!;
        }
        return this.getMessageVariationOf(
            dbValidationResult.messagesForCurrentErr
        );
    };

    getNextBotMessage = (): Message => {
        this.updateBotState();
        const currentQuestions = //get current question variations
            botConfig.botMessages.questions[this.currentProp];
        return this.getMessageVariationOf(currentQuestions(this.userData)); //return a variation for current question
    };

    askToCheckAnswer = (errorMessage: string): Message => {
        return { sender: "bot", message: errorMessage };
    };

    askToVerify = (): Message => {
        this.isAskedToVerify = true;
        return this.getMessageVariationOf(
            botConfig.botMessages.verifications(this.userData)
        );
    };

    getQuestionToEditAnswer = async (
        lastUserMessage: Message
    ): Promise<Message> => {
        let userAns = parseInt(lastUserMessage.message);
        if (!isNaN(userAns)) {
            this.propsIndex = (userAns - 1) % botConfig.props.length; //update index of targeted prop of data
            this.currentProp = botConfig.props[this.propsIndex]; //update targeted prop of data
            const currentQuestions =
                botConfig.botMessages.questions[this.currentProp]; //get bot's current message
            return this.getMessageVariationOf(currentQuestions(this.userData));
        } else return await this.terminateChat();
    };
    
    validateProcessedInput = async <T>(processedInput: T): Promise<string> => {
        try {
            //try validation of processed input using validationSchema
            await botConfig.validationSchema.validateAt(this.currentProp, {
                [this.currentProp]: processedInput,
            });
            return "VALID";
        } catch (err: unknown) {
            //catch error from validationSchema
            if (err instanceof yup.ValidationError) return err.message;
            return err as string;
        }
    };
    
    processInput = (lastUserMessage: Message): typeof this.currentPropValue => {
        let processingMethod = botConfig.processingMethods[this.currentProp]; //get method for processing input for current prop
        type methodReturnType = typeof this.currentPropValue; //get method return type

        //process input
        let processedInput: methodReturnType = processingMethod(
            lastUserMessage.message
        ) as methodReturnType;
        return processedInput;
    };
    
    getMessageVariationOf = (msgs: Message[]): Message => {
        return msgs[Math.floor(Math.random() * msgs.length)]; //send a random variaiton of the bot's current message
    };

    updateBotState = () => {
        this.currentIndex++; //update index from previous message to current  message
        this.isDataGetable = this.currentIndex > 1; //recheck for data avalability
        this.propsIndex = this.currentIndex - 1; //update index of targeted prop of data
        this.currentProp = botConfig.props[this.propsIndex]; //update targeted prop of data
        this.currentPropValue = this.userData[this.currentProp];
    };

    sendFormData = (): Promise<unknown> => {
        const res = fetch(botConfig.formAPIEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.userData),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => err.json());

        return res;
    };
}

export default ChatBot;

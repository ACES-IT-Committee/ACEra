import * as yup from "yup";
import botConfig from "./FormChatbotConfig";
class ChatBot {
    currentIndex = -1; //index of botMessages
    userData: Data = botConfig.userData; //user data to get
    propsIndex = this.currentIndex - 1; //index for props of data
    currentProp = botConfig.props[this.propsIndex]; //current prop of data
    currentPropValue = this.userData[this.currentProp];
    isDataGetable = this.currentIndex > 1; //is there is user data avalabile in chat
    isDataDone = false; //is all of the data given
    isChatDone = false; //is it time to end the chat
    isAskedToVerify = false; //is user asked to verify
    isSolvingDBErrr = false; //is user ansewring question after db error

    //initialize bot
    init = (): Message => {
        this.currentIndex++;
        return this.getVariationOf(botConfig.botMessages.intros);
    };

    //terminate chat
    terminate = async (): Promise<Message> => {
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
        return this.getVariationOf(dbValidationResult.messagesForCurrentErr);
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

    //reply by processing the input, validating, and sending a message
    reply = async (lastUserMessage: Message): Promise<Message> => {
        //reply with a free bot message if it is not time to validate yet
        if (this.currentIndex <= 0) return this.getMessage();

        //if we have the data, and we asked user for data verification
        if (this.isDataDone && this.isAskedToVerify) {
            this.isAskedToVerify = false; //reset ask-to-verify
            return await this.getVerificationQuestion(lastUserMessage); //get verification question
        }

        //process input
        let processedInput = this.processInput(lastUserMessage);

        //validate processed input
        const validationResult = await this.validate<typeof processedInput>(
            processedInput
        );

        //check validation test status
        if (validationResult !== "VALID")
            return this.getRequestion(validationResult); //reply with a requestion with validation error message

        this.userData[this.currentProp] = processedInput as never; //update user data

        //if that answer was not for the last question, ask another question
        if (this.currentIndex !== botConfig.props.length)
            return this.getMessage();

        if (this.isSolvingDBErrr) {
            this.isSolvingDBErrr = false;
        }

        //if that answer was for the last question, then we have the data; ask user for data verification
        this.isDataDone = true;
        return this.askToVerify();
    };

    //ask user to verify their data
    askToVerify = (): Message => {
        this.isAskedToVerify = true;
        return this.getVariationOf(
            botConfig.botMessages.verifications(this.userData)
        );
    };

    //
    getVerificationQuestion = async (
        lastUserMessage: Message
    ): Promise<Message> => {
        let userAns = parseInt(lastUserMessage.message);
        if (!isNaN(userAns)) {
            this.propsIndex = userAns - 1; //update index of targeted prop of data
            this.currentProp = botConfig.props[this.propsIndex]; //update targeted prop of data
            const currentQuestions =
                botConfig.botMessages.questions[this.currentProp]; //get bot's current message
            return this.getVariationOf(currentQuestions(this.userData));
        } else return await this.terminate();
        //get user response: (a) request for editing data [will be a number i such that props.index = i - 1] (b) no, everything is ok
        // (a) 1- modify prop to desired 2- processInput 3- resend message to ask user for edits //(b) thank user and end chat
    };

    //return current message from botMessages
    getMessage = (): Message => {
        this.currentIndex++; //update index from previous message to current  message
        this.isDataGetable = this.currentIndex > 1; //recheck for data avalability
        this.propsIndex = this.currentIndex - 1; //update index of targeted prop of data
        this.currentProp = botConfig.props[this.propsIndex]; //update targeted prop of data
        this.currentPropValue = this.userData[this.currentProp];
        const currentQuestions = //get current question variations
            botConfig.botMessages.questions[this.currentProp];
        return this.getVariationOf(currentQuestions(this.userData)); //return a variation for current question
    };

    //reask the question
    getRequestion = (errorMessage: string): Message => {
        return { sender: "bot", message: errorMessage };
    };

    //get a message variation from given questions' messages
    getVariationOf = (msgs: Message[]): Message => {
        return msgs[Math.floor(Math.random() * msgs.length)]; //send a random variaiton of the bot's current message
    };

    sendFormData = (): Promise<unknown> => {
        const res = fetch("/api/createFormResponse", {
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

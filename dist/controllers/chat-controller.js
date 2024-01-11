import user from "../models/user.js";
import { configureApi } from "../config/openAi-config.js";
import { OpenAIApi } from "openai";
export const generateChat = async (req, res, next) => {
    try {
        const { message } = req.body;
        // console.log("Client Message:",message);
        const User = await user.findById(res.locals.jwtData.id);
        if (!User) {
            return res.status(401).json({ message: "User Not Registered" });
        }
        if (User._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: "Permission didn't match" });
        }
        const chats = User.chats.map(({ role, content }) => {
            return { role, content };
        });
        // console.log("ALL Chats from User",chats);
        chats.push({ content: message, role: "user" });
        User.chats.push({ content: message, role: "user" });
        const config = await configureApi();
        const openAi = new OpenAIApi(config);
        const chatResponse = await openAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        // console.log("Gpt Response",chatResponse);
        User.chats.push(chatResponse.data.choices[0].message);
        await User.save();
        return res.status(200).json({ chats: User.chats });
    }
    catch (error) {
        console.log(error);
        // console.log("Error:",error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendAllChats = async (req, res, next) => {
    try {
        const User = await user.findById(res.locals.jwtData.id);
        if (!User) {
            return res.status(401).json({ message: "User Not Registered" });
        }
        if (User._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: "Permission didn't match" });
        }
        return res.status(200).json({ chats: User.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        const User = await user.findById(res.locals.jwtData.id);
        if (!User) {
            return res.status(401).json({ message: "User Not Registered" });
        }
        if (User._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: "Permission didn't match" });
        }
        //@ts-ignore
        User.chats = [];
        await User.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
//# sourceMappingURL=chat-controller.js.map
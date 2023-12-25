import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatValidator, validate } from "../utils/validator.js";
import { generateChat, sendAllChats } from "../controllers/chat-controller.js";

const chatRouter = Router();

chatRouter.post("/new", validate(chatValidator), verifyToken, generateChat);
chatRouter.get("/all-chats",verifyToken, sendAllChats);

export default chatRouter;

import express from 'express';
import { Message } from '../types/index.js'; // 
import { getNextMessage } from '../services/chatgbt.js';
console.log("chat router loaded");
const router = express.Router();
router.post("/", async (req, res) => {
    const conversation : Message[] = req.body.messages;
    console.log("req.body:", req.body);
    if (!conversation || !Array.isArray(conversation)) {
        return res.status(400).json({
        error: "Conversation must be an array",
        });
    }

    console.log("Incoming messages:", conversation);
    try
    {
        const aiMessage : Message = await getNextMessage(conversation);
        res.status(200).json(aiMessage);
    } catch (error)
    {
        console.error("Error generating AI response:", error);
        res.status(500).json({
        error: "Failed to generate AI response",
        });
    }
});

export default router;
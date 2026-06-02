import OpenAI from 'openai';
import type { Message } from '../../Frontend/src/types/index.js';
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});


export const getNextMessage = async (conversation: Message[]) =>
{
    console.log("hi" + process.env.VITE_OPENAI_API_KEY);
    const messagesWithSystem : Message[] = [
      { role: "system", content: "You are a helpful assistant." },
      ...conversation, // Spread operator to take multiple messages at once
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messagesWithSystem,
    });
    const aiMessage = response.choices[0].message;

    console.log("AI response:", aiMessage);

    return aiMessage as Message;
}
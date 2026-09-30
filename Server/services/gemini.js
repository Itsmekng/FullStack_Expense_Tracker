const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();

const ai = new GoogleGenAI({apiKey:process.env.AI_API_KEY});

const getAiResponse = async (description) => {
    try{
        return await ai.interactions.create({
            "model": "gemini-3.5-flash-lite",
            "input": description
        });
    }catch(err){
        console.log(err);
    }
}

module.exports = getAiResponse
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

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
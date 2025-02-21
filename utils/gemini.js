const { GoogleGenerativeAI } = require("@google/generative-ai");

const callGeminiAPI = async (resumeText) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const prompt = `Extract the following details from the resume text:
        - Name
        - Email
        - Education (Degree, Branch, Institution, Year)
        - Experience (JobTitle, Company, StartDate, EndDate)
        - Skills
        - Generate a short summary about the candidate
        
        Return the output as a JSON object without any extra text.

        Resume Text:
        ${resumeText}`;

        // Ensure prompt is passed as an array
        const result = await model.generateContent([prompt]);
        console.log("result", result.response.candidates[0].content.parts[0].text);
        console.log("i am here1");

        if (!result || !(result.response.candidates) || result.response.candidates.length === 0) {
            throw new Error("Invalid Gemini API response format");
        }
        console.log("i am here");

        const responseText = result.response.candidates[0]?.content?.parts[0]?.text;
        console.log("responseText", responseText);


        if (!responseText) {
            throw new Error("No text data found in Gemini API response");
        }
        console.log("reaching here");

        const cleanedResponse = responseText.replace(/```json\n?/, "").replace(/```/, "");
        const parsedData = JSON.parse(cleanedResponse);
        if (parsedData.Email && typeof parsedData.Email === "string") {
            parsedData.Email = parsedData.Email.split(",").map(email => email.trim());
        }
        console.log("parsedData", parsedData);


        return parsedData;
    } catch (error) {
        console.error("❌ Error calling Gemini API:", error);
        throw new Error("Gemini API failed to process resume");
    }
};

module.exports = callGeminiAPI;

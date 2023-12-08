// Open AI
const OpenAI = require("openai");

const express = require("express");
const router = express.Router();

// env
require("dotenv/config");

const validateFlashcardAnswer = async (req, res) => {
  console.log("validateFlashcardAnswer");
  console.log(req.body);
  try {
    const AIKEY = process.env.OPENAIKEY;
    const openai = new OpenAI({
      apiKey: AIKEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a college instructor." },
        {
          role: "user",

          content: `${req.body.answer} is the answer student gave and ${req.body.correctAnswer} is the correct answer. Compare the two and return only in JSON format structure as 

          {
            response: "response to the student's answer only in 1 of this answer in this array ["Correct",
            "Almost Correct",
            "Somewhat Correct",
            "Incorrect"]
          

          } and nothing else`,

          // content: `${req.body.answer} is the answer student gave and ${req.body.correctAnswer} is the correct answer. Compare the two and give feedback to the student in JSON format structure as
          // {
          //   feedback: "feedback how to improve the answer",
          //   response: "response to the student's answer only in 1 of this answer in this array ["Correct",
          //   "Almost Correct",
          //   "Somewhat Correct",
          //   "Incorrect"]

          // }`,
        },
      ],
    });
    console.log(completion.choices[0]);

    const result = completion.choices[0].message.content;
    res.send(result);
    // return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = validateFlashcardAnswer;

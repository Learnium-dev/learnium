const OpenAI = require("openai");
const axios = require("axios");
const dotenv = require("dotenv");
require("dotenv/config");
const api = process.env.API_URL;
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
// !change this to get userID from global state
const mongoose = require("mongoose");

const uploadContent = async (req, res) => {
  postToDB();

  // try {
  //   const AIKEY = process.env.OPENAIKEY;
  //   console.log(req.body);
  //   console.log(req.body.article);

  //   const openai = new OpenAI({
  //     apiKey: AIKEY,
  //   });

  //   const completion = await openai.chat.completions.create({
  //     model: "gpt-4",
  //     messages: [
  //       { role: "system", content: "You are a education instructor." },
  //       {
  //         role: "user",
  //         content: `please summarize this content from ${req.body.article}
  //         and return me in JSON format with the following information:
  //         1. summary of the article at roughly 20 words.
  //             2. key topic that important for me to know before taking the exam. Key topic can be as many as necessary.
  //         3. Create a question and answer for me to test my knowledge at 5 questions, each question should have 4 choices and related to each key topic. in JSON format with key {question: "question", answer: "answer", choices: ["choice1", "choice2", "choice3", "choice4"], keyTopic: "keyTopic"}
  //         4. Create a flashcard for me to study at 5-10 flashcards depend on how large the article is. Return the flashcard in a format of question and answer.
  //         Plese format JSON object as follow:
  //         {
  //           summary: "summary",
  //           keyTopic: ["keyTopic1", "keyTopic2",....],
  //           questionAnswer: [
  //             {question: "question", answer: "answer", choices: ["choice1", "choice2", "choice3", "choice4"], keyTopic: "keyTopic"},
  //           ],
  //           flashcard: [
  //             {question: "question", answer: "answer"},
  //           ]
  //         }
  //         `,
  //       },
  //     ],
  //   });
  //   console.log(completion.choices[0]);

  //   const result = completion.choices[0].message.content;
  //   res.json(result);

  // }
  //  catch (error) {
  //   console.log(error);
  //   res.status(500).json({ error: "Database Error" });
  // }
};

const postToDB = async (result) => {
  // create post request to create a new folder in DB
  try {
    // !change this to get userID from global state
    // userid: new mongoose.Types.ObjectId('651c6b5cf7a8d6f181bdf41d')
    const newFolder = {
      name: "test",

      userid: "651c6b5cf7a8d6f181bdf41d",
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFolder),
    };
    const folderRes = await fetch(
      `${hostname}:${port}${api}/folders`,
      requestOptions
    );
    console.log(`${hostname}:${port}${api}/folders`);

    if (!folderRes.ok) {
      const error = folderRes.statusText;
      throw new Error(`Network response was not ok ${error}`);
    }
    console.log("folderRes");
    console.log(folderRes);
    return folderRes.json();
  } catch (error) {
    console.log(error);
  }
};

module.exports = uploadContent;

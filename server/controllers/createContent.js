const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
// Open AI
const OpenAI = require("openai");

// POST request
const express = require("express");
const router = express.Router();
const folderPOST = require("../routes/folders.js");

// env
require("dotenv/config");
const api = process.env.API_URL;
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const createContent = async (req, res) => {
  const buffer = req.file.buffer;
  const pdfFileName = req.file.originalname;

  // Use pdf-parse to extract text from the PDF
  pdf(buffer).then((data) => {
    const text = data.text;

    // Name the new file with the original name from the PDF
    const txtFileName = pdfFileName.replace(/\.[^.]+$/, ".txt");

    // Create a new .txt file with the extracted text
    const filePath = path.join(__dirname, txtFileName);

    // Use fs.writeFile to write the text to the file asynchronously
    fs.writeFile(filePath, text, "utf-8", async (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("The file was saved!");
        const article = JSON.stringify({ text });
        const result = await uploadContent(article);
        res.json(result);
      }
    });
  });
};

const uploadContent = async (text) => {
  try {
    // postToDB();
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
          content: `please summarize this content from ${text} 
          and return me in JSON format with the following information:
          1.title of the material
          2.key topic that important for taking the exam. Key topic can be as many as necessary.
          3.For each key topic, create a summary at roughly 20 words.
          4.For each key topic, Create a flashcard for me to study at 7-10 flashcards depend on how large the key topic is.
          5.For each key topic, create a quiz with total of 30 questions. 10 questions with 4 choices and 10 questions with true or false and 10 questions with written test. 
          Plese format JSON object as follow:
          {
            material:title,
            content:[{
            keyTopic: title,
            summary: "summary",
            flashcard: [
              {question: "question", correctAnswer: "answer"},
            ],
            quizMultiChoices: [
              {question: "question", choices: ["choice1", "choice2", "choice3", "choice4"], correctAnswer: "answer"},
            ],
            quizTrueFalse: [
              {question: "question", correctAnswer: "answer"},
            ],
            quizWritten: [
              {question: "question", correctAnswer: "answer"},
            ]
          }]
        }
          `,
        },
      ],
    });
    console.log(completion.choices[0]);

    const result = completion.choices[0].message.content;
    return result;
  } catch (error) {
    console.log(error);
  }
};
// ****make a nested API to POST to DB 'router.post('/folders', createFolder);' in server/routes/folders.js
const postToDB = async (result) => {
  try {
    const newFolderData = {
      name: "test", // Replace with the actual folder name you want to create
      userid: "651c6b5cf7a8d6f181bdf41d", // Replace with the actual user ID
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFolderData),
    };

    const folderRes = await fetch(
      `${hostname}:${port}${api}/folders`,
      requestOptions
    ); // Assuming your API endpoint is correct
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
// router.post(`${api}/folders`, folderPOST);
// router.post(`${api}/folders`, postToDB);

module.exports = createContent;

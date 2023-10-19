const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
// Open AI
const OpenAI = require("openai");


const createContent = async (req, res) => {
  const buffer = req.file.buffer;
  const pdfFileName = req.file.originalname;

  // Use pdf-parse to extract text from the PDF
  pdf(buffer).then((data) => {
    const text = data.text;

    // Name the new file with the original name from the PDF
    const txtFileName = pdfFileName.replace(/\.[^.]+$/, '.txt');

    // Create a new .txt file with the extracted text
    const filePath = path.join(__dirname, txtFileName);

    // Use fs.writeFile to write the text to the file asynchronously
    fs.writeFile(filePath, text, 'utf-8', async (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("The file was saved!");
        const article = JSON.stringify({ text })
        const result = await uploadContent(article);
        res.json(result);
      }
    });
  });


};


const uploadContent = async (text) => {
  try {
    const AIKEY = process.env.OPENAIKEY;
    const openai = new OpenAI({
      apiKey: AIKEY,
    });
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a education instructor." },
        {
          role: "user",
          content: `please summarize this content from ${text} 
          and return me in JSON format with the following information:
          1. summary of the article at roughly 20 words.
              2. key topic that important for me to know before taking the exam. Key topic can be as many as necessary.
          3. Create a question and answer for me to test my knowledge at 5 questions, each question should have 4 choices and related to each key topic. in JSON format with key {question: "question", answer: "answer", choices: ["choice1", "choice2", "choice3", "choice4"], keyTopic: "keyTopic"}
          4. Create a flashcard for me to study at 5-10 flashcards depend on how large the article is. Return the flashcard in a format of question and answer.
          Plese format JSON object as follow:
          {
            summary: "summary",
            keyTopic: ["keyTopic1", "keyTopic2",....],
            questionAnswer: [
              {question: "question", answer: "answer", choices: ["choice1", "choice2", "choice3", "choice4"], keyTopic: "keyTopic"},
            ],
            flashcard: [
              {question: "question", answer: "answer"},
            ]
          }
          `
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

module.exports = createContent;

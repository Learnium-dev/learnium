const OpenAI = require("openai");

const uploadContent = async (req, res) => {
  
//   const result = req.body;
//   res.send(result);

  try {
    const AIKEY = process.env.OPENAIKEY;
    console.log(req.body);
    console.log(req.body.article);
    // const configuration = new Configuration({});

    // configuration.baseOptions.headers = {
    //   Authorization: `Bearer ${AIKEY}`,
    // };

    // console.log(configuration);
    const openai = new OpenAI({
      apiKey: AIKEY,
    });
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a education instructor." },
        {
          role: "user",
          content: `please summarize this content from ${req.body.article} 
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
    res.json(result);
    // res.json({a:"test xxxxxx", b:"test2"})
     
  } catch (error) {
    console.log(error);
    // console.error(error.response.status); // Log the status code
    // console.error(error.response.headers); // Log the response headers
    // console.error(error.response.data);    // Log the response body
    res.status(500).json({ error: "Database Error" });
  }
};

module.exports = uploadContent;
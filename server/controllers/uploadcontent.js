const OpenAI = require("openai");

const uploadContent = async (req, res) => {
  try {
    const AIKEY = process.env.OPENAIKEY;
    console.log(req.body);
    console.log(req.body.article);

    const openai = new OpenAI({
      apiKey: AIKEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a education instructor." },
        {
          role: "user",
          content: `please analyze this content from ${req.body.article} 
          and return me in JSON format with the following information:
          1. key topic that important for taking the exam. amount can be as many as necessary.
          2. summary of each key topic.
          3. For each key topic, create 5 questions to test my knowledge, each question should have 4 choices. 
          4. For each key topic, Create a flashcard for me to study at 5-10 flashcards. 
          Plese format JSON object as follow:
          [
             {
              keyTopic: "title",
              summary: "summary",
              questionAnswer: [
                {question: "question", answer: "answer", choices: ["choice1", "choice2", "choice3", "choice4"]
              ],
              flashcard: [
                {question: "question", answer: "answer"},
              ]
            }
          ]
          `,
        },
      ],
    });
    console.log(completion.choices[0]);

    const result = completion.choices[0].message.content;
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database Error" });
  }
};

module.exports = uploadContent;

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
const AIKEY = process.env.OPENAIKEY;

// langchain
const {
  LLMChain,
  SequentialChain,
  RetrievalQAChain,
  loadQAStuffChain,
  loadQAMapReduceChain,
} = require("langchain/chains");
const { OpenAI: OpenAILangChain } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { FaissStore } = require("langchain/vectorstores/faiss");
const { CharacterTextSplitter } = require("langchain/text_splitter");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { ConversationalRetrievalQAChain } = require("langchain/chains");
const { BufferMemory } = require("langchain/memory");
const { ChatOpenAI } = require("langchain/chat_models/openai");

// ====================================================================================================
// ********** get PDF from client and generate .txt file and text content **********
// ====================================================================================================
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
        // ?call function to the primitive approach
        // const result = await uploadContent(article);
        // res.json(result);

        // ?call function to the langchain 1st approach
        // const result = await chainCall(article);
        // res.json(result);

        // ?call function to the langchain 2nd, 3rd approach
        const result = await embedInput(txtFileName);
        res.json(result);
      }
    });
  });

  // ?bypass the pdf file and use txt file for testing
  // const result = await embedInput(txtFileName);
  // res.json(result);
  // ?bypass the embedInput and use chainCall for testing
  // const result = await chainCall();
  // res.json(result);
};

// ====================================================================================================
// ********** use text content to call openAI with primitive approach
// : wrap everything in prompt and send**********
// ====================================================================================================
// const uploadContent = async (text) => {
//   try {
//     // postToDB();
//     const AIKEY = process.env.OPENAIKEY;
//     const openai = new OpenAI({
//       apiKey: AIKEY,
//     });

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         { role: "system", content: "You are a college instructor." },
//         {
//           role: "user",
//           content: `please summarize this content from ${text}
//           and return me in JSON format with the following information:
//           1.title of the material
//           2.key topic that important for taking the exam. Key topic can be as many as necessary.
//           3.For each key topic, create a summary at roughly 20 words.
//           4.For each key topic, Create a flashcard for me to study at 7-10 flashcards depend on how large the key topic is.
//           5.For each key topic, create a quiz with total of 30 questions. 10 questions with 4 choices and 10 questions with true or false and 10 questions with written test.
//           Plese format JSON object as follow:
//           {
//             material:title,
//             content:[{
//             keyTopic: title,
//             summary: "summary",
//             flashcard: [
//               {question: "question", correctAnswer: "answer"},
//             ],
//             quizMultiChoices: [
//               {question: "question", choices: ["choice1", "choice2", "choice3", "choice4"], correctAnswer: "answer"},
//             ],
//             quizTrueFalse: [
//               {question: "question", correctAnswer: "answer"},
//             ],
//             quizWritten: [
//               {question: "question", correctAnswer: "answer"},
//             ]
//           }]
//         }
//           `,
//         },
//       ],
//     });
//     console.log(completion.choices[0]);

//     const result = completion.choices[0].message.content;
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// ====================================================================================================
// ********** post response to DB with previous version of API********
// !no longer use
// ====================================================================================================
// ****make a nested API to POST to DB 'router.post('/folders', createFolder);' in server/routes/folders.js
// const postToDB = async (result) => {
//   try {
//     const newFolderData = {
//       name: "test", // Replace with the actual folder name you want to create
//       userid: "651c6b5cf7a8d6f181bdf41d", // Replace with the actual user ID
//     };

//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newFolderData),
//     };

//     const folderRes = await fetch(
//       `${hostname}:${port}${api}/folders`,
//       requestOptions
//     ); // Assuming your API endpoint is correct
//     console.log(`${hostname}:${port}${api}/folders`);

//     if (!folderRes.ok) {
//       const error = folderRes.statusText;
//       throw new Error(`Network response was not ok ${error}`);
//     }
//     console.log("folderRes");
//     console.log(folderRes);
//     return folderRes.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

// !new approach use langchain to create chain of response

// ====================================================================================================
// ********** create embedded data from text input with langchain **********
// ====================================================================================================
const embedInput = async (txtFileName) => {
  console.log("embedInput");
  // const loader = new TextLoader(`./controllers/restaurant.txt`);
  const loader = new TextLoader(`./controllers/${txtFileName}`);

  const docs = await loader.load();

  const splitter = new CharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 50,
  });

  const documents = await splitter.splitDocuments(docs);
  // console.log(documents);

  const embeddings = new OpenAIEmbeddings({ openAIApiKey: AIKEY });

  const vectorstore = await FaissStore.fromDocuments(documents, embeddings);
  await vectorstore.save("./");
  const response = await chainCall();
  return response;
};

// ====================================================================================================
// ********** sending prompt to openAI with different method
// 1. **********
// ====================================================================================================

const chainCall = async () => {
  // ! approach 1 : SequentialChain
  // const chainCall = async (article) => {
  // const llm = new OpenAILangChain({ temperature: 0, openAIApiKey: AIKEY });

  // const parser = StructuredOutputParser.fromNamesAndDescriptions({
  //   name: "title of each key topic",
  //   summary: "summary of each key topic",
  //   questions: [
  //     {
  //       question: "question",
  //       option: ["option1", "option2", "option3", "option4"],
  //       answer: "answer",
  //       type: "type of question which can be 'multiple choice', 'true/false' , or 'written'",
  //     },
  //   ],
  //   flashcards: [
  //     {
  //       question: "question",
  //       answers: ["answer"],
  //     },
  //   ],
  // });
  // const formatInstructions = parser.getFormatInstructions();

  // let template =
  //   "Generate key topics from {inputArticle} that important for the exam at 4-5 key topics.";
  // let promptTemplate = new PromptTemplate({
  //   template,
  //   inputVariables: ["inputArticle"],
  // });
  // const keyTopicChain = new LLMChain({
  //   llm,
  //   prompt: promptTemplate,
  //   outputKey: "keyTopic",
  // });

  // template = "generate a summary at roughly 40 words for each {keyTopic}.";
  // promptTemplate = new PromptTemplate({
  //   template,
  //   inputVariables: ["keyTopic"],
  // });
  // const summaryChain = new LLMChain({
  //   llm,
  //   prompt: promptTemplate,
  //   outputKey: "summary",
  // });

  // template =
  //   "for every {keyTopic}, generate set of flashcards with exactly 2 questions per key topic. Use the content from {inputArticle} to generate the flashcards. return a response with the following format 1.'keyTopic' 2.'question1' 3.'answer1' and so on. ";
  // promptTemplate = new PromptTemplate({
  //   template,
  //   inputVariables: ["keyTopic", "inputArticle"],
  // });
  // const flashcardChain = new LLMChain({
  //   llm,
  //   prompt: promptTemplate,
  //   outputKey: "flashcard",
  // });

  // const overallChain = new SequentialChain({
  //   chains: [keyTopicChain, summaryChain, flashcardChain],
  //   inputVariables: ["inputArticle"],
  //   outputVariables: ["keyTopic", "summary", "flashcard"],
  //   partialVariables: { format_instructions: formatInstructions },
  // });

  // let response = await overallChain.call({
  //   inputArticle: article,
  // });
  // console.log(response);

  // const formattedResponse = await parser.parse(response);
  // console.log(formattedResponse);
  // return formattedResponse;

  // ! approach 2 : RetrievalQAChain

  const embeddings = new OpenAIEmbeddings({ openAIApiKey: AIKEY });
  const vectorStore = await FaissStore.load("./", embeddings);

  const model = new OpenAILangChain({ temperature: 0, openAIApiKey: AIKEY });

  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    name: "title of each key topic",
    summary: "summary of each key topic",
    questions: [
      {
        question: "question",
        option: ["option1", "option2", "option3", "option4"],
        answer: "answer",
        type: "type of question which can be 'multiple choice', 'true/false' , or 'written'",
      },
    ],
    flashcards: [
      {
        question: "question",
        answers: ["answer"],
      },
    ],
  });
  const formatInstructions = parser.getFormatInstructions();

  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQAStuffChain(model),
    retriever: vectorStore.asRetriever(),
    prompt: formatInstructions,
    // returnSourceDocuments: true,
  });

  const prompt = new PromptTemplate({
    template:
      "Answer with best of your knowledge\n{format_instructions}\n question: {question}",
    inputVariables: ["question"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const inputPrompt = await prompt.format({
    question:
      "Please generate key topic that important for taking the exam. For each key topic create a summary at roughly 20 words, 7-10 flashcards with questions and answer, a quiz with total of 30 questions with 10 questions with 4 choices and 10 questions with true or false and 10 questions with written test.",
  });
  // console.log("inputPrompt", inputPrompt);
  try {
    // const resInput = await chain.call(inputPrompt);
    // console.log("chainCallInput");
    // console.log("res");
    // console.log(res);
    // console.log("resInput.text");
    // console.log(resInput.text);
    // const question = "which country win the World War II?";
    // const question = "Please generate key topic that important for taking the exam around 2-3 key topics. For each key topic create a summary at roughly 20 words.";
    // const question = "Please generate key topic that important for taking the exam around 5-7 key topic as a numbered list. For each key topic create a summary at roughly 20 words";
    const query =
      "Please generate 5-7 key topics that important for taking the exam. For each key topic create a summary at roughly 20 words, 7-10 flashcards with questions and answer, a quiz with total of 30 questions with 10 questions with 4 choices and 10 questions with true or false and 10 questions with written test.";
    // const question = "Who is Tony Thawatchai?"
    // const question = "What is openAI?"
    // const question = "When mcdonald's was founded?"
    // const question = "Which company Tony Thawatchai is working for?"

    console.log(query);
    const res = await chain.call({
      query: query,
    });
    // console.log("chainCall3");
    // // console.log("res");
    // // console.log(res);
    console.log("res.text");
    console.log(res.text);

    // const question2 = "what are the names of the leader of those country?"
    const query2 =
      "for each those key topics, generate 7-10 questions and answer for each key topic.";
    // const question2 = "for each those key topics, create quiz with total of 3 questions with 1 questions with 4 choices and 1 questions with true or false and 1 questions with written test. return me with the following format: 1.'keyTopic' 2.'question1' 3.'answer1' and so on."
    // const question2 = "When is Tony Thawatchai's birthday?"
    // const question2 = "When openAI company was founded?"
    // const question2 = "Who is the founder of openAI?"
    // const question2 = "Who is the founder of that company?"
    // const question2 = "Who is the biggest shareholder?"
    // const question2 = "What is that company do?"
    // console.log("question2:", question2)
    // const res2 = await chain.call({
    //   query : query2
    // })
    // // console.log(res2);
    // console.log(res2.text);



    // const formattedResponse = await parser.parse(res.text);
    // console.log(formattedResponse);


    return res.text;
    // ! approach 3 : ConversationalRetrievalQAChain

    // const embeddings = new OpenAIEmbeddings({ openAIApiKey: AIKEY });
    // const vectorStore = await FaissStore.load("./", embeddings);

    // const model = new OpenAILangChain({ temperature: 0, openAIApiKey: AIKEY });

    // const parser = StructuredOutputParser.fromNamesAndDescriptions({
    //   name: "title of each key topic",
    //   summary: "summary of each key topic",
    //   questions: [
    //     {
    //       question: "question",
    //       option: ["option1", "option2", "option3", "option4"],
    //       answer: "answer",
    //       type: "type of question which can be 'multiple choice', 'true/false' , or 'written'",
    //     },
    //   ],
    //   flashcards: [
    //     {
    //       question: "question",
    //       answers: ["answer"],
    //     },
    //   ],
    // });
    // const formatInstructions = parser.getFormatInstructions();

    // const fasterModel = new ChatOpenAI({
    //   modelName: "gpt-3.5-turbo",
    //   openAIApiKey: AIKEY
    // });
    // const chain = ConversationalRetrievalQAChain.fromLLM(
    //   model,
    //   vectorStore.asRetriever(),
    //   {
    //     // returnSourceDocuments: true,
    //     memory: new BufferMemory({
    //       memoryKey: "chat_history",
    //       inputKey: "question", // The key for the input to the chain
    //       outputKey: "text", // The key for the final conversational output of the chain
    //       returnMessages: true, // If using with a chat model (e.g. gpt-3.5 or gpt-4)
    //     }),
    //     combine_docs_chain_kwargs:{prompt: formatInstructions}
    //     // condense_question_prompt: CONDENSEprompt,
    //     // questionGeneratorChainOptions: {
    //     //   llm: fasterModel,
    //     // },

    //   }
    // );

    
  // const prompt = new PromptTemplate({
  //   template:
  //     "Answer with best of your knowledge\n{format_instructions}\n question: {question}",
  //   inputVariables: ["question"],
  //   partialVariables: { format_instructions: formatInstructions },
  // });

  // const inputPrompt = await prompt.format({
  //   question:
  //     "Please generate key topic that important for taking the exam. For each key topic create a summary at roughly 20 words, 7-10 flashcards with questions and answer, a quiz with total of 30 questions with 10 questions with 4 choices and 10 questions with true or false and 10 questions with written test.",
  // });
  // console.log("inputPrompt", inputPrompt);
  // try {
    // const resInput = await chain.call(inputPrompt);
    // console.log("chainCallInput");
    // console.log("res");
    // console.log(res);
    // console.log("resInput.text");
    // console.log(resInput.text);
    // const question = "which country win the World War II?";
    // const question = "Please generate key topic that important for taking the exam around 2-3 key topics. For each key topic create a summary at roughly 20 words.";
    // const question = "Please generate key topic that important for taking the exam around 5-7 key topic as a numbered list. For each key topic create a summary at roughly 20 words";
    // const question =
    //   "Please generate 5-7 key topics that important for taking the exam. For each key topic create a summary at roughly 20 words, 7-10 flashcards with questions and answer, a quiz with total of 30 questions with 10 questions with 4 choices and 10 questions with true or false and 10 questions with written test.";
    // const question = "Who is Tony Thawatchai?"
    // const question = "What is openAI?"
    // const question = "When mcdonald's was founded?"
    // const question = "Which company Tony Thawatchai is working for?"

    // console.log(question);
    // const res = await chain.call({
    //   question: question,
    // });
    // console.log("chainCall3");
    // // console.log("res");
    // // console.log(res);
    // console.log("res.text");
    // console.log(res.text);

    // const question2 = "what are the names of the leader of those country?"
    // const question2 =
    //   "for each those key topics, generate 7-10 questions and answer for each key topic.";
    // const question2 = "for each those key topics, create quiz with total of 3 questions with 1 questions with 4 choices and 1 questions with true or false and 1 questions with written test. return me with the following format: 1.'keyTopic' 2.'question1' 3.'answer1' and so on."
    // const question2 = "When is Tony Thawatchai's birthday?"
    // const question2 = "When openAI company was founded?"
    // const question2 = "Who is the founder of openAI?"
    // const question2 = "Who is the founder of that company?"
    // const question2 = "Who is the biggest shareholder?"
    // const question2 = "What is that company do?"
    // console.log("question2:", question2)
    // const res2 = await chain.call({
    //   question : question2
    // })
    // // console.log(res2);
    // console.log(res2.text);


    // const formattedResponse = await parser.parse(res.text);
    // console.log(formattedResponse);
    
    // return res.text;
  } catch (error) {
    console.error("Error in chain.call:", error);
  }
};

module.exports = createContent;

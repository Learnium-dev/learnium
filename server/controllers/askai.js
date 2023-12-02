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
const { MemoryVectorStore } = require("langchain/vectorstores/memory");

const askai = async (req, res) => {
  const question = req.body;
  console.log("question:", question);

  // const response = await embedInput("WorldWar2.txt");
  // console.log("response:", response);
  // res.json(response);
  const response = await getChatResponse(question);
  // console.log("response:", response);
  res.json(response);
};

const getChatResponse = async (questionParam) => {
  console.log("questionParam", questionParam);
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: AIKEY });

  const vectorStore = await FaissStore.load("./", embeddings);

  const model = new OpenAILangChain({
    temperature: 0,
    openAIApiKey: AIKEY,
    modelName: "gpt-4",
  });

  const chat = new ChatOpenAI({ temperature: 0, openAIApiKey: AIKEY });

  const fasterModel = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: AIKEY,
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      // returnSourceDocuments: true,
      memory: new BufferMemory({
        memoryKey: "chat_history",
        inputKey: "question", // The key for the input to the chain
        outputKey: "text", // The key for the final conversational output of the chain
        returnMessages: true, // If using with a chat model (e.g. gpt-3.5 or gpt-4)
      }),
      // combine_docs_chain_kwargs: { prompt: formatInstructions },
      // condense_question_prompt: CONDENSEprompt,
      questionGeneratorChainOptions: {
        llm: fasterModel,
      },
    }
  );

  const question99 = questionParam.inputText;
  console.log("question99:");
  console.log(question99);
  try {
    const resInput99 = await chain.call({
      question: question99,
    });

    console.log(resInput99.text);
    return resInput99.text;
  } catch (error) {
    console.log(error);
  }
};

module.exports = askai;

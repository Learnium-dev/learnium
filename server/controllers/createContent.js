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
const {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} = require("langchain/prompts");
const { ConversationChain } = require("langchain/chains");

// ====================================================================================================
// ********** get PDF from client and generate .txt file and text content **********
// ====================================================================================================
const createContent = async (req, res) => {
  // console.log("req", req.body)
  // console.log("req.body.email", req.body.email)
  // console.log("req.token", req.body.token)
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
        // const resultA = await embedInput(txtFileName);
        // res.json(result);
        // result is text content so we need to use res.send instead of res.json
        // res.send(result);

        // ?MOCK UP RESPONSE FAKE DATA

        const result = {
          folders: {
            name: "History of Canada",
            content: "pdf content",
            url: "url",
            userid: { _id: "652b873c4a2d1d449326af34" },
          },

          keytopics: [
            // keytopic #1
            {
              name: "Indigenous Peoples in Canada",
              summary:
                "Indigenous peoples have inhabited Canada for thousands of years, with diverse cultures and languages. European colonization led to the displacement and mistreatment of Indigenous communities.",

              questions: [
                {
                  question:
                    "What is the primary cause of Indigenous land disputes in Canada?",
                  answers: ["Historical land treaties and agreements"],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the Royal Commission on Aboriginal Peoples?",
                  answers: [
                    "It addressed issues of Indigenous land claims and self-governance.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "Who are the Métis people, and what is their cultural background?",
                  answers: [
                    "Métis are people of mixed Indigenous and European ancestry.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the purpose of the Truth and Reconciliation Commission in Canada?",
                  answers: [
                    "To address the historical abuses of Indigenous children in residential schools.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What are the three main Indigenous groups in Canada?",
                  answers: ["First Nations, Inuit, Métis"],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the National Indigenous Peoples Day in Canada?",
                  answers: [
                    "It celebrates and recognizes the contributions of Indigenous peoples.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the purpose of the Canadian Human Rights Act in relation to Indigenous peoples?",
                  answers: [
                    "To protect Indigenous people from discrimination based on their ethnicity.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the Oka Crisis in 1990?",
                  answers: [
                    "It was a standoff between Mohawk activists and the Canadian government over land disputes.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the Mi'kmaq people in Canadian history?",
                  answers: [
                    "They have a rich cultural heritage and played a key role in early interactions with Europeans.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the role of the Assembly of First Nations in Canadian politics?",
                  answers: [
                    "It represents the interests of First Nations across Canada to the government.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "True or False: Indigenous peoples in Canada have a single, unified culture.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Indian Act is no longer in effect in Canada.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Royal Commission on Aboriginal Peoples was established in the 20th century.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada has two official languages, English and French.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Indigenous languages are not recognized as official languages in Canada.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Canadian government has fully addressed all issues raised by the Truth and Reconciliation Commission.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Royal Commission on Aboriginal Peoples recommended self-governance for Indigenous communities.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Inuit people primarily inhabit the southern regions of Canada.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Métis people have no European ancestry.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: National Indigenous Peoples Day is a statutory holiday in Canada.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "Which Indigenous group primarily inhabits the Arctic and Northern regions of Canada?",
                  options: ["First Nations", "Inuit", "Métis", "Cree"],
                  answers: ["Inuit"],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the concept of the 'Sixties Scoop' in Canadian Indigenous history?",
                  options: [
                    "A cultural exchange program in the 1960s.",
                    "A period of rapid social change in the 1960s.",
                    "The mass removal of Indigenous children from their families in the 1960s.",
                    "An Indigenous art movement in the 1960s.",
                  ],
                  answers: [
                    "The mass removal of Indigenous children from their families in the 1960s.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "Which European explorer is credited with the first contact with Indigenous peoples in Canada?",
                  options: [
                    "John Cabot",
                    "Jacques Cartier",
                    "Samuel de Champlain",
                    "Henry Hudson",
                  ],
                  answers: ["Jacques Cartier"],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the purpose of the National Inquiry into Missing and Murdered Indigenous Women and Girls in Canada?",
                  options: [
                    "To celebrate the achievements of Indigenous women and girls.",
                    "To address and prevent violence against Indigenous women and girls.",
                    "To promote Indigenous art and culture.",
                    "To provide educational scholarships for Indigenous women and girls.",
                  ],
                  answers: [
                    "To address and prevent violence against Indigenous women and girls.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the role of the Inuit Tapiriit Kanatami in Canada?",
                  options: [
                    "To represent the interests of the Inuit people in Canada.",
                    "To promote multiculturalism in the Arctic regions of Canada.",
                    "To oversee Indigenous land claims.",
                    "To manage national parks in the northern territories of Canada.",
                  ],
                  answers: [
                    "To represent the interests of the Inuit people in Canada.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the significance of the United Nations Declaration on the Rights of Indigenous Peoples (UNDRIP)?",
                  options: [
                    "It granted full sovereignty to Indigenous nations.",
                    "It established a framework for the protection of Indigenous rights and culture.",
                    "It created an international Indigenous military alliance.",
                    "It abolished the Indian Act in Canada.",
                  ],
                  answers: [
                    "It established a framework for the protection of Indigenous rights and culture.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the purpose of the Canadian Human Rights Act in relation to Indigenous peoples?",
                  options: [
                    "To protect Indigenous people from discrimination based on their ethnicity.",
                    "To promote the use of Indigenous languages in government.",
                    "To fund Indigenous art and cultural festivals.",
                    "To oversee Indigenous land claims.",
                  ],
                  answers: [
                    "To protect Indigenous people from discrimination based on their ethnicity.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the significance of the Kelowna Accord in Canadian Indigenous politics?",
                  options: [
                    "It aimed to address socio-economic disparities among Indigenous communities.",
                    "It led to the establishment of Indigenous language schools.",
                    "It created a national Indigenous political party.",
                    "It marked the end of Indigenous land claims in Canada.",
                  ],
                  answers: [
                    "It aimed to address socio-economic disparities among Indigenous communities.",
                  ],
                  type: "multiple choice",
                },
              ],

              flashcards: [
                {
                  question: "Who are the Indigenous peoples of Canada?",
                  answers: ["First Nations, Inuit, Métis"],
                },
                {
                  question:
                    "What is the Indian Act's significance in Canadian history?",
                  answers: [
                    "It imposed restrictions on Indigenous cultures and rights.",
                  ],
                },
                {
                  question:
                    "What is the 'Sixties Scoop' in Canadian Indigenous history?",
                  answers: [
                    "The mass removal of Indigenous children from their families in the 1960s.",
                  ],
                },
                {
                  question:
                    "Who primarily inhabits the Arctic and Northern regions of Canada?",
                  answers: ["Inuit"],
                },
                {
                  question:
                    "What is the primary cause of Indigenous land disputes in Canada?",
                  answers: ["Historical land treaties and agreements"],
                },
                {
                  question:
                    "What are the three main Indigenous groups in Canada?",
                  answers: ["First Nations, Inuit, Métis"],
                },
                {
                  question:
                    "What is the significance of the National Indigenous Peoples Day in Canada?",
                  answers: [
                    "It celebrates and recognizes the contributions of Indigenous peoples.",
                  ],
                },
                {
                  question:
                    "What is the purpose of the Truth and Reconciliation Commission in Canada?",
                  answers: [
                    "To address the historical abuses of Indigenous children in residential schools.",
                  ],
                },
                {
                  question:
                    "What is the significance of the Mi'kmaq people in Canadian history?",
                  answers: [
                    "They have a rich cultural heritage and played a key role in early interactions with Europeans.",
                  ],
                },
                {
                  question:
                    "What is the role of the Assembly of First Nations in Canadian politics?",
                  answers: [
                    "It represents the interests of First Nations across Canada to the government.",
                  ],
                },
              ],
            },
            // keytopic #2
            {
              name: "Colonization and Confederation",
              summary:
                "European exploration and colonization shaped Canada's history. The Confederation of 1867 united several provinces into a dominion and laid the foundation for modern Canada.",
              questions: [
                {
                  question:
                    "What year did the British North America Act create the Dominion of Canada?",
                  answers: ["1867"],
                  type: "written",
                },
                {
                  question:
                    "Which provinces joined the Dominion of Canada in 1867?",
                  answers: ["Ontario, Quebec, New Brunswick, Nova Scotia"],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the War of 1812 in Canadian history?",
                  answers: [
                    "It reinforced Canadian identity and led to the burning of the White House in Washington, D.C.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "Which European power controlled Canada before British colonization?",
                  answers: ["France"],
                  type: "written",
                },
                {
                  question: "Who was the first Prime Minister of Canada?",
                  answers: ["Sir John A. Macdonald"],
                  type: "written",
                },
                {
                  question:
                    "What is the purpose of the Canadian Confederation in 1867?",
                  answers: [
                    "To unify British North American colonies into a single dominion.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "Which province did not join the Dominion of Canada in 1867 but later joined in 1871?",
                  answers: ["Manitoba"],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the Hudson's Bay Company in early Canadian history?",
                  answers: [
                    "It was a major fur trading company that played a role in colonization.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What was the impact of the Gold Rush on Canada's development?",
                  answers: [
                    "It led to increased settlement and economic growth in British Columbia.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the Charlottetown Conference of 1864?",
                  answers: [
                    "It laid the groundwork for Canadian Confederation.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the role of the Governor General in Canada's political system?",
                  answers: [
                    "The Governor General represents the monarch in Canada and carries out ceremonial duties.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "True or False: The Dominion of Canada was initially composed of ten provinces and three territories.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada was involved in the Boer War.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Newfoundland and Labrador joined the Dominion of Canada in 1949.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Indigenous peoples in Canada have a single, unified culture.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada has two official languages, English and French.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Royal Commission on Aboriginal Peoples was established in the 20th century.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada remained neutral during the American Civil War.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The completion of the Canadian Pacific Railway had no economic impact on Canada.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada's adoption of the metric system was a result of Confederation in 1867.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "What is the purpose of the Fathers of Confederation in Canadian history?",
                  options: [
                    "They were key figures in the creation of the Dominion of Canada.",
                  ],
                  answers: [
                    "They were key figures in the creation of the Dominion of Canada.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the role of the Canadian Senate in Canada's political system?",
                  options: [
                    "The Senate is responsible for proposing and passing all federal legislation.",
                    "The Senate represents provincial governments in federal matters.",
                    "The Senate acts as the primary judicial branch in Canada.",
                    "The Senate has no role in the Canadian government.",
                  ],
                  answers: [
                    "The Senate represents provincial governments in federal matters.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the significance of the Alaska Boundary Dispute between Canada and the United States?",
                  options: [
                    "It led to the establishment of the Canada-U.S. border.",
                    "It resulted in the sale of Alaska to the United States.",
                    "It was resolved through diplomatic negotiations.",
                    "It had no impact on Canadian history.",
                  ],
                  answers: ["It was resolved through diplomatic negotiations."],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the purpose of the Canadian Pacific Railway in the late 19th century?",
                  options: [
                    "To provide passenger transportation across Canada.",
                    "To facilitate the movement of goods and resources.",
                    "To promote cultural exchange between eastern and western Canada.",
                    "To establish a national airline.",
                  ],
                  answers: [
                    "To facilitate the movement of goods and resources.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the significance of the Red River Rebellion led by Louis Riel?",
                  options: [
                    "It was a Métis-led resistance against Canadian government policies.",
                    "It was a conflict between Canada and the United States.",
                    "It led to the discovery of gold in the Red River region.",
                    "It resulted in the establishment of a new province.",
                  ],
                  answers: [
                    "It was a Métis-led resistance against Canadian government policies.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the role of the Lieutenant Governor in Canada's political system?",
                  options: [
                    "The Lieutenant Governor represents the monarch in the provincial government.",
                    "The Lieutenant Governor is the head of the federal government.",
                    "The Lieutenant Governor is the commander-in-chief of the Canadian Armed Forces.",
                    "The Lieutenant Governor has no official role in the government.",
                  ],
                  answers: [
                    "The Lieutenant Governor represents the monarch in the provincial government.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the purpose of the Canadian Confederation in 1867?",
                  options: [
                    "To unify British North American colonies into a single dominion.",
                    "To establish Canada as a monarchy.",
                    "To achieve full independence from the British Empire.",
                    "To promote cultural exchange between Indigenous and European populations.",
                  ],
                  answers: [
                    "To unify British North American colonies into a single dominion.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the significance of the Alaska Boundary Dispute between Canada and the United States?",
                  options: [
                    "It resulted in the sale of Alaska to the United States.",
                    "It had no impact on Canadian history.",
                    "It led to the establishment of the Canada-U.S. border.",
                    "It was resolved through armed conflict.",
                  ],
                  answers: ["It was resolved through diplomatic negotiations."],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the role of the Canadian Senate in Canada's political system?",
                  options: [
                    "The Senate represents provincial governments in federal matters.",
                    "The Senate is responsible for proposing and passing all federal legislation.",
                    "The Senate has no role in the Canadian government.",
                    "The Senate is the primary executive branch in Canada.",
                  ],
                  answers: [
                    "The Senate represents provincial governments in federal matters.",
                  ],
                  type: "multiple choice",
                },
              ],
              flashcards: [
                {
                  question:
                    "Which European explorer had the first contact with Indigenous peoples in Canada?",
                  answers: ["Jacques Cartier"],
                },
                {
                  question:
                    "What year did the British North America Act create the Dominion of Canada?",
                  answers: ["1867"],
                },
                {
                  question:
                    "Which provinces joined the Dominion of Canada in 1867?",
                  answers: ["Ontario, Quebec, New Brunswick, Nova Scotia"],
                },
                {
                  question: "Who was the first Prime Minister of Canada?",
                  answers: ["Sir John A. Macdonald"],
                },
                {
                  question:
                    "What is the purpose of the Canadian Confederation in 1867?",
                  answers: [
                    "To unify British North American colonies into a single dominion.",
                  ],
                },
              ],
            },
            // keytopic #3
            {
              name: "World Wars and International Relations",
              summary:
                "Canada played significant roles in both World Wars and developed its international identity through peacekeeping, diplomacy, and participation in global organizations.",
              questions: [
                {
                  question: "What was Canada's role in World War I?",
                  answers: [
                    "Canada served as a major combatant in World War I.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "During which World War did Canada introduce conscription, leading to a divisive issue?",
                  answers: ["World War I"],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the United Nations Declaration on the Rights of Indigenous Peoples (UNDRIP)?",
                  answers: [
                    "It established a framework for the protection of Indigenous rights and culture.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the role of the Inuit Tapiriit Kanatami in Canada?",
                  answers: [
                    "To represent the interests of the Inuit people in Canada.",
                  ],
                  type: "written",
                },
                {
                  question: "What was Canada's role in World War II?",
                  answers: [
                    "Canada played a significant role in World War II as a major Allied contributor.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the purpose of the North Atlantic Treaty Organization (NATO) in international relations?",
                  answers: [
                    "To promote collective defense and security among member states.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What was the significance of Canada's role in the Suez Crisis in 1956?",
                  answers: [
                    "Canada played a key role in the United Nations Emergency Force (UNEF) to resolve the crisis.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the United Nations Peacekeeping Forces in Canada's international relations?",
                  answers: [
                    "Canada is known for its significant contribution to UN peacekeeping missions.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the purpose of the Commonwealth of Nations (formerly the British Commonwealth) in international relations?",
                  answers: [
                    "To promote cooperation and mutual support among member countries.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the role of the Governor General in Canada's international relations?",
                  answers: [
                    "The Governor General represents the monarch in diplomatic matters with other countries.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "True or False: Canada remained neutral in both World War I and World War II.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada is a founding member of the United Nations.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The United Nations Emergency Force (UNEF) was primarily composed of Canadian troops.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada's contributions to international peacekeeping were primarily in Africa.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The North Atlantic Treaty Organization (NATO) was primarily a military alliance against the Soviet Union.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Suez Crisis had no impact on Canada's international relations.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Commonwealth of Nations is a political union with a shared currency.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada's participation in the Korean War was a United Nations mission.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada has never had a significant role in international peacekeeping missions.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Battle of Vimy Ridge was a significant World War II battle in which Canada played a crucial role.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "What was the impact of Canada's participation in the Korean War?",
                  options: [
                    "Canada's military strength significantly increased.",
                    "Canada emerged as a key diplomatic player on the global stage.",
                    "Canada experienced an economic downturn due to war expenses.",
                    "Canada faced no significant impact from the war.",
                  ],
                  answers: [
                    "Canada emerged as a key diplomatic player on the global stage.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What was the purpose of the United Nations Peacekeeping Forces in the context of the Cold War?",
                  options: [
                    "To serve as a buffer between NATO and Warsaw Pact countries.",
                    "To enforce strict neutrality among member states.",
                    "To prevent countries from joining the United Nations.",
                    "To promote military escalation between superpowers.",
                  ],
                  answers: [
                    "To serve as a buffer between NATO and Warsaw Pact countries.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the significance of the Battle of Dieppe during World War II?",
                  options: [
                    "It was a successful Allied operation to liberate France.",
                    "It was a disastrous raid that highlighted the need for better planning.",
                    "It was a major victory for Axis forces in Europe.",
                    "It marked the end of World War II.",
                  ],
                  answers: [
                    "It was a disastrous raid that highlighted the need for better planning.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the role of the Governor General in Canada's international relations?",
                  options: [
                    "The Governor General is responsible for forming Canada's foreign policy.",
                    "The Governor General represents the United Nations in Canada.",
                    "The Governor General serves as the commander-in-chief of the Canadian military.",
                    "The Governor General has no official role in international relations.",
                  ],
                  answers: [
                    "The Governor General represents the monarch in diplomatic matters with other countries.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What was Canada's primary role in the United Nations Emergency Force (UNEF) during the Suez Crisis?",
                  options: [
                    "Canada provided financial support to the UNEF.",
                    "Canada served as the military commander of the UNEF.",
                    "Canada supplied peacekeeping troops to the UNEF.",
                    "Canada played no role in the UNEF.",
                  ],
                  answers: ["Canada supplied peacekeeping troops to the UNEF."],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the primary purpose of the North Atlantic Treaty Organization (NATO) during the Cold War?",
                  options: [
                    "To promote diplomatic relations between member states.",
                    "To foster cultural exchange between member countries.",
                    "To maintain a military alliance against the threat of the Soviet Union.",
                    "To create a common currency for member nations.",
                  ],
                  answers: [
                    "To maintain a military alliance against the threat of the Soviet Union.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the impact of the participation of Canadian soldiers in the Battle of Vimy Ridge during World War I?",
                  options: [
                    "It was a resounding victory and a symbol of Canadian military excellence.",
                    "It had no significant impact on Canada's military history.",
                    "It led to the defeat of Canadian forces by the Axis powers.",
                    "It marked the end of World War I.",
                  ],
                  answers: [
                    "It was a resounding victory and a symbol of Canadian military excellence.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the primary purpose of the United Nations Declaration on the Rights of Indigenous Peoples (UNDRIP)?",
                  options: [
                    "To grant full sovereignty to Indigenous nations.",
                    "To establish a common language for Indigenous peoples.",
                    "To promote Indigenous art and culture.",
                    "To create a framework for the protection of Indigenous rights and culture.",
                  ],
                  answers: [
                    "To create a framework for the protection of Indigenous rights and culture.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What was Canada's primary contribution to the United Nations in the post-World War II era?",
                  options: [
                    "Canada provided significant financial support to the United Nations.",
                    "Canada played a leading role in the establishment of the United Nations.",
                    "Canada served as the first Secretary-General of the United Nations.",
                    "Canada had no significant role in the United Nations.",
                  ],
                  answers: [
                    "Canada played a leading role in the establishment of the United Nations.",
                  ],
                  type: "multiple choice",
                },
              ],
              flashcards: [
                {
                  question: "What was Canada's role in World War I?",
                  answers: [
                    "Canada served as a major combatant in World War I.",
                  ],
                },
                {
                  question:
                    "During which World War did Canada introduce conscription?",
                  answers: ["World War I"],
                },
                {
                  question:
                    "Which international organization was founded in 1945 to promote peace and cooperation?",
                  answers: ["United Nations"],
                },
                {
                  question:
                    "What role did Lester B. Pearson play in international diplomacy?",
                  answers: [
                    "He introduced the idea of peacekeeping forces and won the Nobel Peace Prize.",
                  ],
                },
                {
                  question:
                    "What was the purpose of the Canadian Flag Debate in 1964?",
                  answers: [
                    "To establish a new national flag for Canada, resulting in the Maple Leaf flag.",
                  ],
                },
              ],
            },
            // keytopic #4
            {
              name: "Cultural Diversity and Multiculturalism",
              summary:
                "Canada is known for its diverse cultural mosaic, with people from all over the world. Multiculturalism is a key aspect of Canadian identity and policies.",
              questions: [
                {
                  question:
                    "What is the significance of the Canadian Multiculturalism Act of 1988?",
                  answers: [
                    "It formally recognized and promoted multiculturalism in Canada.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the role of the Canadian Radio-television and Telecommunications Commission (CRTC) in relation to cultural diversity?",
                  answers: [
                    "The CRTC regulates and promotes Canadian content in media to ensure cultural diversity.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the purpose of the Canadian Museum for Human Rights in Winnipeg?",
                  answers: [
                    "It serves as a national museum that educates visitors about human rights issues and cultural diversity.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the role of the Office of the Commissioner of Official Languages in Canada?",
                  answers: [
                    "It ensures the implementation of the Official Languages Act, promoting bilingualism and cultural diversity.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the Canadian Charter of Rights and Freedoms in the context of cultural diversity?",
                  answers: [
                    "It protects the cultural and linguistic rights of individuals and communities in Canada.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the purpose of the Canadian Content regulations for television and radio in Canada?",
                  answers: [
                    "To promote and preserve Canadian culture and content on the airwaves.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the role of the Canadian Race Relations Foundation (CRRF) in promoting cultural diversity?",
                  answers: [
                    "The CRRF promotes racial harmony and supports research and initiatives on multiculturalism.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the Canadian Human Rights Act in relation to cultural diversity?",
                  answers: [
                    "It prohibits discrimination based on race, ethnicity, and other grounds, promoting cultural diversity.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the purpose of National Indigenous Peoples Day in Canada?",
                  answers: [
                    "It celebrates and recognizes the contributions of Indigenous peoples to Canada's cultural diversity.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "What is the significance of the Official Languages Act in Canada?",
                  answers: [
                    "It recognizes English and French as the official languages of Canada, promoting cultural diversity.",
                  ],
                  type: "written",
                },
                {
                  question:
                    "True or False: Canada is officially bilingual, with English and French as its only recognized languages.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada's Multiculturalism Policy was officially adopted in 1971.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Canadian Charter of Rights and Freedoms does not protect cultural and linguistic rights.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Canadian Multiculturalism Act only applies to federal institutions.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: National Indigenous Peoples Day is a statutory holiday in Canada.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada's multicultural policies have been without controversy and criticism.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Office of the Commissioner of Official Languages is primarily responsible for enforcing copyright laws in Canada.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Canadian Race Relations Foundation (CRRF) promotes racial segregation in Canada.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: The Canadian Radio-television and Telecommunications Commission (CRTC) has no role in promoting cultural diversity.",
                  answers: ["False"],
                  type: "true/false",
                },
                {
                  question:
                    "True or False: Canada's multiculturalism policies have contributed to a rich tapestry of cultural diversity.",
                  answers: ["True"],
                  type: "true/false",
                },
                {
                  question:
                    "What is the primary purpose of the Canadian Multiculturalism Act of 1988?",
                  options: [
                    "To establish English and French as official languages.",
                    "To promote and recognize cultural diversity in Canada.",
                    "To regulate immigration policies.",
                    "To establish a national holiday for cultural diversity.",
                  ],
                  answers: [
                    "To promote and recognize cultural diversity in Canada.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the role of the Canadian Human Rights Act in relation to cultural diversity?",
                  options: [
                    "It promotes a single, unified Canadian culture.",
                    "It protects cultural diversity and prevents discrimination.",
                    "It establishes the Official Languages Act.",
                    "It enforces copyright laws.",
                  ],
                  answers: [
                    "It protects cultural diversity and prevents discrimination.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the purpose of the Canadian Museum for Human Rights in Winnipeg?",
                  options: [
                    "To promote a single, unified Canadian culture.",
                    "To educate visitors about human rights issues and cultural diversity.",
                    "To serve as a political headquarters for cultural diversity.",
                    "To promote racial segregation.",
                  ],
                  answers: [
                    "To educate visitors about human rights issues and cultural diversity.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the significance of the Official Languages Act in Canada?",
                  options: [
                    "It recognizes a multitude of official languages in Canada.",
                    "It promotes bilingualism and multiculturalism.",
                    "It established Canada's official religion.",
                    "It enforces immigration policies.",
                  ],
                  answers: ["It promotes bilingualism and multiculturalism."],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the role of the Canadian Race Relations Foundation (CRRF) in promoting cultural diversity?",
                  options: [
                    "The CRRF promotes racial segregation.",
                    "The CRRF supports research and initiatives on multiculturalism.",
                    "The CRRF serves as a political party advocating for cultural diversity.",
                    "The CRRF enforces copyright laws.",
                  ],
                  answers: [
                    "The CRRF supports research and initiatives on multiculturalism.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the purpose of the Canadian Content regulations for television and radio in Canada?",
                  options: [
                    "To regulate international content on Canadian television and radio.",
                    "To promote and preserve Canadian culture and content on the airwaves.",
                    "To establish a single, unified Canadian culture.",
                    "To control immigration policies.",
                  ],
                  answers: [
                    "To promote and preserve Canadian culture and content on the airwaves.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the primary purpose of National Indigenous Peoples Day in Canada?",
                  options: [
                    "To celebrate and recognize the contributions of Indigenous peoples to Canada's cultural diversity.",
                    "To promote a single, unified Canadian culture.",
                    "To regulate immigration policies.",
                    "To create a national holiday for all Canadians.",
                  ],
                  answers: [
                    "To celebrate and recognize the contributions of Indigenous peoples to Canada's cultural diversity.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the role of the Canadian Radio-television and Telecommunications Commission (CRTC) in relation to cultural diversity?",
                  options: [
                    "The CRTC regulates international radio and television content.",
                    "The CRTC enforces copyright laws.",
                    "The CRTC promotes Canadian content in media to ensure cultural diversity.",
                    "The CRTC serves as the head of government in Canada.",
                  ],
                  answers: [
                    "The CRTC promotes Canadian content in media to ensure cultural diversity.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the significance of the Canadian Charter of Rights and Freedoms in the context of cultural diversity?",
                  options: [
                    "It promotes a single, unified Canadian culture.",
                    "It protects the cultural and linguistic rights of individuals and communities in Canada.",
                    "It establishes Canada's official language.",
                    "It enforces copyright laws.",
                  ],
                  answers: [
                    "It protects the cultural and linguistic rights of individuals and communities in Canada.",
                  ],
                  type: "multiple choice",
                },
                {
                  question:
                    "What is the purpose of the Canadian Multiculturalism Act of 1988?",
                  options: [
                    "To promote and recognize cultural diversity in Canada.",
                    "To regulate immigration policies.",
                    "To establish a single, unified Canadian culture.",
                    "To create a national holiday for all Canadians.",
                  ],
                  answers: [
                    "To promote and recognize cultural diversity in Canada.",
                  ],
                  type: "multiple choice",
                },
              ],

              flashcards: [
                {
                  question:
                    "What year did Canada officially adopt multiculturalism as a policy?",
                  answers: ["1971"],
                },
                {
                  question:
                    "What is the significance of the Chinese Head Tax in Canadian history?",
                  answers: [
                    "It was a discriminatory tax imposed on Chinese immigrants in the late 19th and early 20th centuries.",
                  ],
                },
                {
                  question:
                    "True or False: Canada has two official languages, English and French.",
                  answers: ["True"],
                },
                {
                  question:
                    "What is the purpose of the Canadian Multiculturalism Act?",
                  answers: [
                    "To preserve and enhance multiculturalism in Canada.",
                  ],
                },
                {
                  question:
                    "Which cultural community was forcibly relocated during the Japanese-Canadian internment in World War II?",
                  answers: ["Japanese Canadians"],
                },
              ],
            },
          ],
        };
        const DBresponse = await postToDBServerSide(
          result,
          req.body.email,
          req.body.token
        );
        res.json(DBresponse);
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
  // console.log("🚀 ~ file: createContent.js:214 ~ response:", response);
  return response;
  // return vectorstore;
  // const response = await getChatResponse();
  // return response;
};

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
  //
  // ! approach 2 : RetrievalQAChain

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

  // const chain = new RetrievalQAChain({
  //   combineDocumentsChain: loadQAStuffChain(model),
  //   retriever: vectorStore.asRetriever(),
  //   prompt: formatInstructions,
  //   // returnSourceDocuments: true,
  // });

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
  // // console.log("inputPrompt", inputPrompt);
  // try {
  //   // const resInput = await chain.call(inputPrompt);
  //   // console.log("chainCallInput");
  //   // console.log("res");
  //   // console.log(res);
  //   // console.log("resInput.text");
  //   // console.log(resInput.text);
  //   // const question = "which country win the World War II?";
  //   // const question = "Please generate key topic that important for taking the exam around 2-3 key topics. For each key topic create a summary at roughly 20 words.";
  //   // const question = "Please generate key topic that important for taking the exam around 5-7 key topic as a numbered list. For each key topic create a summary at roughly 20 words";
  //   const query =
  //     "Please generate 5-7 key topics that important for taking the exam. For each key topic create a summary at roughly 20 words, 7-10 flashcards with questions and answer, a quiz with total of 30 questions with 10 questions with 4 choices and 10 questions with true or false and 10 questions with written test.";
  //   // const question = "Who is Tony Thawatchai?"
  //   // const question = "What is openAI?"
  //   // const question = "When mcdonald's was founded?"
  //   // const question = "Which company Tony Thawatchai is working for?"

  //   console.log(query);
  //   const res = await chain.call({
  //     query: query,
  //   });
  //   // console.log("chainCall3");
  //   // // console.log("res");
  //   // // console.log(res);
  //   console.log("res.text");
  //   console.log(res.text);

  //   // const question2 = "what are the names of the leader of those country?"
  //   const query2 =
  //     "for each those key topics, generate 7-10 questions and answer for each key topic.";
  //   // const question2 = "for each those key topics, create quiz with total of 3 questions with 1 questions with 4 choices and 1 questions with true or false and 1 questions with written test. return me with the following format: 1.'keyTopic' 2.'question1' 3.'answer1' and so on."
  //   // const question2 = "When is Tony Thawatchai's birthday?"
  //   // const question2 = "When openAI company was founded?"
  //   // const question2 = "Who is the founder of openAI?"
  //   // const question2 = "Who is the founder of that company?"
  //   // const question2 = "Who is the biggest shareholder?"
  //   // const question2 = "What is that company do?"
  //   // console.log("question2:", question2)
  //   // const res2 = await chain.call({
  //   //   query : query2
  //   // })
  //   // // console.log(res2);
  //   // console.log(res2.text);

  //   // const formattedResponse = await parser.parse(res.text);
  //   // console.log(formattedResponse);

  //   return res.text;
  // ! approach 3 : ConversationalRetrievalQAChain

  const embeddings = new OpenAIEmbeddings({ openAIApiKey: AIKEY });
  const vectorStore = await FaissStore.load("./", embeddings);

  const model = new OpenAILangChain({ temperature: 0, openAIApiKey: AIKEY });

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
      // combine_docs_chain_kwargs:{prompt: formatInstructions}
      // condense_question_prompt: CONDENSEprompt,
      questionGeneratorChainOptions: {
        llm: fasterModel,
      },
    }
  );

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
  try {
    // const resInput = await chain.call(inputPrompt);
    // console.log("chainCallInput");
    // console.log("res");
    // console.log(res);
    // console.log("resInput.text");
    // console.log(resInput.text);
    const question = "which country win the World War II?";
    // const question = "Please generate key topic that important for taking the exam around 2-3 key topics. For each key topic create a summary at roughly 20 words.";
    // const question = "Please generate key topic that important for taking the exam around 5-7 key topic as a numbered list. For each key topic create a summary at roughly 20 words";
    // const question =
    //   "Please generate 5-7 key topics that important for taking the exam. For each key topic create a summary at roughly 20 words, 7-10 flashcards with questions and answer, a quiz with total of 30 questions with 10 questions with 4 choices and 10 questions with true or false and 10 questions with written test.";
    // const question = "Who is Tony Thawatchai?"
    // const question = "What is openAI?"
    // const question = "When mcdonald's was founded?"
    // const question = "Which company Tony Thawatchai is working for?"

    console.log(question);
    const res = await chain.call({
      question: question,
    });
    // console.log("chainCall3");
    // // console.log("res");
    // // console.log(res);
    console.log("res.text");
    console.log(res.text);

    const question2 = "what are the names of the leader of those country?";
    // const question2 =
    //   "for each those key topics, generate 7-10 questions and answer for each key topic.";
    // const question2 = "for each those key topics, create quiz with total of 3 questions with 1 questions with 4 choices and 1 questions with true or false and 1 questions with written test. return me with the following format: 1.'keyTopic' 2.'question1' 3.'answer1' and so on."
    // const question2 = "When is Tony Thawatchai's birthday?"
    // const question2 = "When openAI company was founded?"
    // const question2 = "Who is the founder of openAI?"
    // const question2 = "Who is the founder of that company?"
    // const question2 = "Who is the biggest shareholder?"
    // const question2 = "What is that company do?"
    console.log("question2:", question2);
    const res2 = await chain.call({
      question: question2,
    });
    // // console.log(res2);
    console.log(res2.text);

    // const formattedResponse = await parser.parse(res.text);
    // console.log(formattedResponse);

    return res.text;
  } catch (error) {
    console.error("Error in chain.call:", error);
  }
};

module.exports = createContent;
// module.exports = askai;

// ====================================================================================================
// ********** make a POST request to DB **********
// ====================================================================================================

const postToDBServerSide = async (result, email, token) => {
  try {
    // const newFolderData = {
    //   name: "test", // Replace with the actual folder name you want to create
    //   userid: "651c6b5cf7a8d6f181bdf41d", // Replace with the actual user ID
    // };
    console.log("postToDBServerSide");

    const tokenEmail = email;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(result),
    };

    const folderRes = await fetch(
      `http://localhost:3000/api/v1/folders/createcontent?email=${tokenEmail}`,
      requestOptions
    ); // Assuming your API endpoint is correct
    console.log("URL", `${hostname}:${port}${api}/folders`);

    if (!folderRes.ok) {
      const error = folderRes.statusText;
      throw new Error(`Network response was not ok ${error}`);
    }
    console.log("folderRes");
    return folderRes.json();
  } catch (error) {
    console.log(error);
  }
};

const express = require("express");
const router = express.Router();
// Calling Folder Model
const { foldermodel } = require("../models/folders");
// Calling Keytopic Model
const { keytopicmodel } = require("../models/keytopics");
// Calling Quizzes Model
const { quizmodel } = require("../models/quizzes");
// Calling Details Model
const { detailmodel } = require("../models/details");
// Calling Flashcard Model
const { flashcardmodel } = require("../models/flashcards");

// User API
const { usermodel } = require("../models/users");

// GET
router.get(`/`, async (req, res) => {
  const userdata = await usermodel.findOne({ email: req.query.email });

  // Filter by User Id
  let filter = {};
  if (req.query.userid) {
    filter = { userid: userdata?._id };
  }

  const folderList = await foldermodel.find(filter);

  if (!folderList) {
    res.status(500).json({
      success: false,
      message: "There are no Folders",
    });
  }
  res.status(200).send(folderList);
});

// GET - Find by Id
router.get(`/:id`, async (req, res) => {
  const folderList = await foldermodel.findById(req.params.id);

  if (!folderList) {
    res.status(500).json({
      success: false,
      message: "The Folder could not be found",
    });
  }
  res.status(200).send(folderList);
});

// UPDATE
router.put(`/:id`, async (req, res) => {
  const updateFolder = await foldermodel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      userid: req.body.userid,
    },
    {
      new: true,
    }
  );

  if (!updateFolder) {
    res.status(400).json({
      success: false,
      message: "The folder could not be updated",
    });
  }
  res.status(200).send(updateFolder);
});

// POST
router.post(`/`, (req, res) => {
  const newfolder = new foldermodel({
    name: req.body.name,
    userid: req.body.userid,
  });

  newfolder
    .save()
    .then((createfolder) => {
      res.status(201).json(createfolder);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  foldermodel
    .findByIdAndRemove(req.params.id)
    .then((deletefolder) => {
      if (deletefolder) {
        return res.status(200).json({
          success: true,
          message: "The Folder was deleted.",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Folder not found.",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: err,
      });
    });
});

// NEW POST
router.post(`/createcontent`, async (req, res) => {
  // Find UserId
  const userdata = await usermodel.findOne({ email: req.query.email });

  // POST Folders data
  console.log(`User Id: ${userdata._id}`);
  let newfolder = new foldermodel({
    name: req.body.folders.name,
    content: req.body.folders.content,
    url: req.body.folders.url,
    userid: userdata._id,
  });
  newfolder = await newfolder.save();
  // console.log(`Folder Id: ${newfolder._id}`);

  // POST Keytopics data
  let newKeyTopic;
  const keyTopics = req.body.keytopics?.map(async (keytopic) => {
    newKeyTopic = new keytopicmodel({
      folderid: newfolder._id,
      name: keytopic.name,
      summary: keytopic.summary,
    });
    newKeyTopic = await newKeyTopic.save();
    console.log(`Keytopic Id: ${newKeyTopic._id}`);

    // POST Question
    let newQuiz = new quizmodel({
      keytopicid: newKeyTopic._id,
      folderid: newfolder._id,
    });
    newQuiz = await newQuiz.save();
    console.log(`Quiz Id: ${newQuiz._id}`);

    // POST Questions Details
    const questions = keytopic?.questions?.map(async (questionsList) => {
      const newDetail = new detailmodel({
        quizid: newQuiz._id,
        question: questionsList?.question, // Set question from the request body
        correctanswer: questionsList?.answers, // Set correctanswer from the request body
        type: questionsList?.type, // Set type from the request body
        options: questionsList?.options,
        folderid: newfolder._id,
      });

      const savedDetail = await newDetail.save();
    });

    // POST Flashcard
    let newFlashcard = new flashcardmodel({
      keytopicid: newKeyTopic._id,
      folderid: newfolder._id,
    });
    newFlashcard = await newFlashcard.save();
    console.log(`Flashcard Id: ${newFlashcard._id}`);

    // POST Flascards Details
    const flashcards = keytopic?.flashcards?.map(async (flashcardsList) => {
      const newDetail = new detailmodel({
        flashcardid: newFlashcard._id,
        question: flashcardsList?.question, // Set question from the request body
        correctanswer: flashcardsList?.answers, // Set correctanswer from the request body
        folderid: newfolder._id,
      });

      const savedDetail = await newDetail.save();
    });
  });

  const result = {
    userid: userdata._id,
    folderid: newfolder._id,
  };

  res.status(200).send(result);
});

module.exports = router;

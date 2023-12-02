const express = require("express");
const router = express.Router();
// Calling Detail Model
const { detailmodel } = require("../models/details");
// Calling Quiz Model
const { quizmodel } = require("../models/quizzes");

// GET
router.get(`/`, async (req, res) => {
  let filter = {};
  let filterDetail = {};
  let quizzesList = null;
  let detailList = null;

  // Find Quiz by Keytopic Id
  if (req.query.keytopicid) {
    filter = { keytopicid: req.query.keytopicid };
    quizzesList = await quizmodel.findOne(filter);

    filterDetail = { quizid: quizzesList?._id };

    if (req.query.truefalse || req.query.multiplechoice || req.query.written) {
      let filterConditions = [];

      if (req.query.truefalse) {
        filterConditions.push({ type: "true/false" });
      }

      if (req.query.multiplechoice) {
        filterConditions.push({ type: "multiple choice" });
      }

      if (req.query.written) {
        filterConditions.push({ type: "written" });
      }

      filterDetail = { quizid: quizzesList?._id, $or: filterConditions };
      // console.log(filterDetail)
    }

    detailList = await detailmodel.find(filterDetail).limit(10);
  } else if (req.query.folderid) {
    filter = { folderid: req.query.folderid };
    detailList = await detailmodel.find(filter);
  }

  if (!detailList) {
    res.status(500).json({
      success: false,
      message: "There are no Details",
    });
  }
  res.status(200).send(detailList);
});

// GET Single Question
router.get(`/singlequestion`, async (req, res) => {
  let filter = {};
  let quizzesList = [];

  // Find Quiz by Keytopic Id
  if (req.query.keytopicid) {
    filter = { keytopicid: req.query.keytopicid };
    quizzesList = await quizmodel.findOne(filter);
    if (!quizzesList) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found with the provided key topic ID",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Key topic ID is required",
    });
  }

  const filterDetail = { quizid: quizzesList._id };
  const detailList = await detailmodel.aggregate([
    { $match: filterDetail },
    { $sample: { size: 1 } },
  ]);

  if (!detailList || detailList.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Details not found for the quiz",
    });
  }

  res.status(200).json(detailList[0]);
});

// GET Count Details
router.get(`/countfalse`, async (req, res) => {
  // Filter by isDone
  let filter = {};
  if (req.query.quizid) {
    filter = { isdone: false, quizid: req.query.quizid };
  } else if (req.query.flashcardid) {
    filter = { isdone: false, flashcardid: req.query.flashcardid };
  }

  const detailList = await detailmodel.count(filter);

  if (!detailList) {
    res.status(500).json({
      success: false,
      message: "There are no Details",
    });
  }
  res.send({
    total: detailList,
  });
  //res.status(200).send(detailList);
});

// GET Count Details
router.get(`/counttrue`, async (req, res) => {
  // Filter by isDone
  let filter = {};
  if (req.query.quizid) {
    filter = { isdone: true, quizid: req.query.quizid };
  } else if (req.query.flashcardid) {
    filter = { isdone: true, flashcardid: req.query.flashcardid };
  }

  const detailList = await detailmodel.count(filter);

  if (!detailList) {
    res.status(500).json({
      success: false,
      message: "There are no Details",
    });
  }
  res.send({
    total: detailList,
  });
});

// GET - Find by Id
router.get(`/:id`, async (req, res) => {
  const detailList = await detailmodel.findById(req.params.id);

  if (!detailList) {
    res.status(500).json({
      success: false,
      message: "The Details could not be found",
    });
  }
  res.status(200).send(detailList);
});

// GET - Find by QuizId
router.get(`/dailyQuestion/:id`, async (req, res) => {
  const detailList = await detailmodel.findOne({ quizid: req.params.id });

  if (!detailList) {
    res.status(500).json({
      success: false,
      message: "The Details could not be found",
    });
  }
  res.status(200).send(detailList);
});

// UPDATE
router.put(`/:id`, async (req, res) => {
  const updateDetails = await detailmodel.findByIdAndUpdate(
    req.params.id,
    {
      flashcardid: req.body.flashcardid,
      quizid: req.body.quizid,
      progress: req.body.progress,
      isdone: req.body.isdone,
      answer: req.body.answer,
      question: req.body.question,
      correctanswer: req.body.correctanswer,
      folderid: req.body.folderid,
    },
    {
      new: true,
    }
  );

  if (!updateDetails) {
    res.status(400).json({
      success: false,
      message: "The detail could not be updated",
    });
  }
  res.status(200).send(updateDetails);
});

// POST
router.post(`/`, (req, res) => {
  const newDetail = new detailmodel({
    flashcardid: req.body.flashcardid,
    quizid: req.body.quizid,
    progress: req.body.progress,
    isdone: req.body.isdone,
    answer: req.body.answer,
    question: req.body.question,
    correctanswer: req.body.correctanswer,
    folderid: req.body.folderid,
  });

  newDetail
    .save()
    .then((createdetail) => {
      res.status(201).json(createdetail);
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
  detailmodel
    .findByIdAndRemove(req.params.id)
    .then((deletedetail) => {
      if (deletedetail) {
        return res.status(200).json({
          success: true,
          message: "The Detail was deleted.",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Detail not found.",
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

module.exports = router;

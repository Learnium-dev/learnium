const express = require("express");
const router = express.Router();
// Calling Flashcard Model
const { flashcardmodel } = require("../models/flashcards");

// GET
router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.keytopicid) {
    console.log("keytopicid");
    filter = { keytopicid: req.query.keytopicid };
  }

  if (req.query.folderid) {
    console.log("folderid", req.query.folderid);
    filter = { folderid: req.query.folderid };
  }

  const flashcardList = await flashcardmodel.find(filter).populate("details");

  if (!flashcardList) {
    res.status(500).json({
      success: false,
      message: "There are no Flashcards",
    });
  }
  res.status(200).send(flashcardList);
});

// GET - Find by Id
router.get(`/:id`, async (req, res) => {
  const flashcardList = await flashcardmodel.findById(req.params.id);

  if (!flashcardList) {
    res.status(500).json({
      success: false,
      message: "The Flashcard could not be found",
    });
  }
  res.status(200).send(flashcardList);
});

// UPDATE
router.put(`/:id`, async (req, res) => {
  const updateFlashcard = await flashcardmodel.findByIdAndUpdate(
    req.params.id,
    {
      keytopicid: req.body.keytopicid,
      materialid: req.body.materialid,
      duedate: req.body.duedate,
      progress: req.body.progress,
      practicemode: req.body.practicemode,
    },
    {
      new: true,
    }
  );

  if (!updateFlashcard) {
    res.status(400).json({
      success: false,
      message: "The flashcard could not be updated",
    });
  }
  res.status(200).send(updateFlashcard);
});

// POST
router.post(`/`, (req, res) => {
  const newflashcard = new flashcardmodel({
    keytopicid: req.body.keytopicid,
    materialid: req.body.materialid,
    duedate: req.body.duedate,
    progress: req.body.progress,
    practicemode: req.body.practicemode,
  });

  newflashcard
    .save()
    .then((createflashcard) => {
      res.status(201).json(createflashcard);
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
  flashcardmodel
    .findByIdAndRemove(req.params.id)
    .then((deleteflashcard) => {
      if (deleteflashcard) {
        return res.status(200).json({
          success: true,
          message: "The Flashcard was deleted.",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Flashcard not found.",
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

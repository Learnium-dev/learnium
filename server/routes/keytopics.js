const express = require("express");
const router = express.Router();
// Calling Keytopic Model
const { keytopicmodel } = require("../models/keytopics");

// User API
const { usermodel } = require("../models/users");
// Calling Folder Model
const { foldermodel } = require("../models/folders");
// GET
router.get(`/`, async (req, res) => {
  // Find UserId
  const userdata = await usermodel.findOne({ email: req.query.email });
  console.log("userdata", userdata);

  console.log("FOLDER ID", req.query.folderid);
  const folderdata = await foldermodel.find(
    req.query.folderid ? { _id: req.query.folderid } : { userid: userdata?._id }
  );
  // Filter by Date
  let filter = {};
  let startdate;
  let enddate;
  console.log("req.query.startdate", req.query.startdate);
  console.log("req.query.enddate", req.query.enddate);
  if (req.query.startdate && req.query.enddate) {
    startdate = new Date(req.query.startdate);
    enddate = new Date(req.query.enddate);
    enddate.setHours(enddate.getHours() + 23, 59, 59, 999);
  }
  // Filter by Folder Id
  let keytopicList = [];
  for (let folder of folderdata) {
    if (req.query.startdate && req.query.enddate) {
      filter = {
        duedate: { $gte: startdate, $lte: enddate },
        folderid: folder._id,
      };
    } else {
      filter = { folderid: folder._id };
    }
    console.log("filter", filter);
    const keytopics = await keytopicmodel.find(filter).populate({
      path: "folderid",
      select: "_id name",
    });
    keytopicList = [...keytopicList, ...keytopics];
  }
  if (!keytopicList.length) {
    res.status(500).json({
      success: false,
      message: "There are no Keytopics",
    });
  }
  res.status(200).send(keytopicList);
});

// GET - Find by Id
router.get(`/:id`, async (req, res) => {
  const keytopicList = await keytopicmodel.findById(req.params.id);
  if (!keytopicList) {
    res.status(500).json({
      success: false,
      message: "The Keytopic could not be found",
    });
  }
  res.status(200).send(keytopicList);
});

// UPDATE
router.put(`/:id`, async (req, res) => {
  const updateKeytopic = await keytopicmodel.findByIdAndUpdate(
    req.params.id,
    {
      materialid: req.body.materialid,
      name: req.body.name,
      progress: req.body.progress,
    },
    {
      new: true,
    }
  );
  if (!updateKeytopic) {
    res.status(400).json({
      success: false,
      message: "The keytopic could not be updated",
    });
  }
  res.status(200).send(updateKeytopic);
});

// UPDATE - Update Date
router.put(`/newContent/updateDate`, async (req, res) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const folderId = req.body.folderId;
  const studyDays = req.body.days;
  const date = req.body.date;

  console.log("THIS IS THE DATE!", date);

  // Get the dates range
  const todayDate = new Date().toISOString();
  const examDate = new Date(date).toISOString();

  // get the number of days between today and exam date
  const daysBetween = Math.floor(
    (Date.parse(examDate) - Date.parse(todayDate)) / 86400000
  );

  // get all the dates from the days of the week in the array studyDays between today and exam date
  const studyDates = [];
  for (let i = 0; i <= daysBetween; i++) {
    const date = new Date(todayDate);
    date.setDate(date.getDate() + i);
    if (studyDays.includes(daysOfWeek[date.getDay()])) {
      studyDates.push(date);
    }
  }

  // get all the keytopics with the same folderid and update their duedate
  const keytopics = await keytopicmodel.find({ folderid: folderId });
  for (let i = 0; i < keytopics.length; i++) {
    keytopics[i].duedate = studyDates[i];
    keytopics[i].save();
  }

  res.status(200).send(keytopics);
});

// POST
router.post(`/`, (req, res) => {
  const newKeytopic = new keytopicmodel({
    materialid: req.body.materialid,
    name: req.body.name,
    progress: req.body.progress,
  });
  newKeytopic
    .save()
    .then((createKeytopic) => {
      res.status(201).json(createKeytopic);
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
  keytopicmodel
    .findByIdAndRemove(req.params.id)
    .then((deleteKeytopic) => {
      if (deleteKeytopic) {
        return res.status(200).json({
          success: true,
          message: "The Keytopic was deleted.",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Keytopic not found.",
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

// PUT Update keytopic progress after the quiz result
router.put("/update/progress", async (req, res) => {
  try {
    const keytopicId = req.query.keytopicid;
    // Assuming the progress is initially set to 0, increment it by 33.33 for each quiz completion
    const updatedKeytopic = await keytopicmodel.findOneAndUpdate(
      { _id: keytopicId },
      { $inc: { progress: 33.33 } },
      { new: true } // Return the updated document
    );

    if (!updatedKeytopic) {
      return res.status(404).json({ error: "Keytopic not found" });
    }

    res.json(updatedKeytopic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

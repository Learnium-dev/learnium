const express = require('express');
const router = express.Router();
// Calling Detail Model
const {historydetailmodel} = require('../models/historydetails');
// Calling Quiz Model
const {historyquizmodel} = require('../models/historyquizzes');

// GET
router.get(`/`, async (req, res)=>{
     let filter = {};
    let filterDetail = {};
    let quizzesList = null;
    let detailList = null;

    // TEMPORALY CHANGED TO GET ALL QUIZZES

    // GET Comprehensive History
    if (req.query.folderid) {
      filter = { folderid: req.query.folderid };
      quizzesList = await historyquizmodel.find(filter);
      filterDetail = { historyquizid: { $in: quizzesList.map((quiz) => quiz._id) } }; 
      detailList = await historydetailmodel.find(filterDetail);
      detailList = [];
    }
    // GET Keytopic History
    else if (req.query.keytopicid) {
        filter = { keytopicid: req.query.keytopicid };
        quizzesList = await historyquizmodel.find(filter);
        filterDetail = { historyquizid: { $in: quizzesList.map((quiz) => quiz._id) } };
        detailList = await historydetailmodel.find(filterDetail);
    }

    if(!detailList){
        res.status(500).json({
            success:false,
            message:'There are no Details'
        })
    }

    const result = {
        historyquizzes: quizzesList,
        historydetails: detailList,
    }

    res.status(200).send(result);
})

// GET Count Details
router.get(`/countfalse`, async (req, res)=>{

    // Filter by isDone
    let filter = {};
    if(req.query.quizid){
        filter = { isdone: false, quizid: req.query.quizid }; 
    } else if(req.query.flashcardid){
        filter = { isdone: false, flashcardid: req.query.flashcardid }; 
    } 

    const detailList = await historydetailmodel.count(filter);

    if(!detailList){
        res.status(500).json({
            success:false,
            message:'There are no Details'
        })
    }
    res.send({
        total: detailList
    });
    //res.status(200).send(detailList);
})

// GET Count Details
router.get(`/counttrue`, async (req, res)=>{

    // Filter by isDone
    let filter = {};
    if(req.query.quizid){
        filter = { isdone: true, quizid: req.query.quizid }; 
    } else if(req.query.flashcardid){
        filter = { isdone: true, flashcardid: req.query.flashcardid }; 
    } 

    const detailList = await historydetailmodel.count(filter);

    if(!detailList){
        res.status(500).json({
            success:false,
            message:'There are no Details'
        })
    }
    res.send({
        total: detailList
    });
})

// GET - Find by Id
router.get(`/:id`, async (req, res)=>{
    const detailList = await historydetailmodel.findById(req.params.id);

    if(!detailList){
        res.status(500).json({
            success:false,
            message:'The Details could not be found'
        })
    }
    res.status(200).send(detailList);
})

// GET - Find by QuizId
router.get(`/dailyQuestion/:id`, async (req, res)=>{
  const detailList = await historydetailmodel.findOne({quizid: req.params.id});

  if(!detailList){
      res.status(500).json({
          success:false,
          message:'The Details could not be found'
      })
  }
  res.status(200).send(detailList);
})

// UPDATE
router.put(`/:id`, async (req, res)=>{
    const updateDetails = await historydetailmodel.findByIdAndUpdate(
        req.params.id,
        {
            flashcardid: req.body.flashcardid,
            quizid: req.body.quizid,
            progress: req.body.progress,
            isdone: req.body.isdone,
            answer: req.body.answer,
            question: req.body.question,
            correctanswer: req.body.correctanswer,
        },
        {
            new: true
        });

    if(!updateDetails){
        res.status(400).json({
            success:false,
            message:'The detail could not be updated'
        })
    }
    res.status(200).send(updateDetails);
})

// POST
router.post(`/`,(req, res)=>{

    const newDetail = new historydetailmodel({
        flashcardid: req.body.flashcardid,
        quizid: req.body.quizid,
        progress: req.body.progress,
        isdone: req.body.isdone,
        answer: req.body.answer,
        question: req.body.question,
        correctanswer: req.body.correctanswer,
        folderid: req.body.folderid,
    }) 

    newDetail.save().then((createdetail => {
        res.status(201).json(createdetail)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// DELETE
router.delete('/:id',(req,res)=>{
    historydetailmodel.findByIdAndRemove(req.params.id).then(deletedetail => {
        if(deletedetail){
            return res.status(200).json({
                success: true,
                message:'The Detail was deleted.'
            })
        }else{
            return res.status(404).json({
                success: false,
                message:'Detail not found.'
            })
        }
    }).catch(err=>{
        return res.status(400).json({
            success: false,
            message: err
        })
    })
})

module.exports = router;
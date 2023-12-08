const express = require('express');
const router = express.Router();
// Calling History Quizz Model
const {historyquizmodel} = require('../models/historyquizzes');
// Calling Folder Model
const {foldermodel} = require('../models/folders')
// Calling History Quizz Detail Model
const {historydetailmodel} = require('../models/historydetails')
// Calling Keytopic Model
const {keytopicmodel} = require('../models/keytopics');

// GET
router.get(`/`, async (req, res)=>{
    let filter = {};
    // Find Keytopic Id
    if(req.query.keytopicid){
        filter = {keytopicid: req.query.keytopicid}
    }

    const quizzesList = await historyquizmodel.find(filter).populate('keytopicid').sort({ duedate: 1 });

    if(!quizzesList){
        res.status(500).json({
            success:false,
            message:'There are no Quizzes'
        })
    }
    res.status(200).send(quizzesList);
})

// GET - Find by Id
router.get(`/:id`, async (req, res)=>{
    const quizzesList = await historyquizmodel.findById(req.params.id);
    if(!quizzesList){
        res.status(500).json({
            success:false,
            message:'The quiz could not be found'
        })
    }
    res.status(200).send(quizzesList);
})

// UPDATE
router.put(`/:id`, async (req, res)=>{
    const updateQuiz = await historyquizmodel.findByIdAndUpdate(
        req.params.id,
        {
            keytopicid: req.body.keytopicid,
            materialid: req.body.materialid,
            name: req.body.name,
            duedate: req.body.duedate,
            progress: req.body.progress,
        },
        {
            new: true
        });
    if(!updateQuiz){
        res.status(400).json({
            success:false,
            message:'The quiz could not be updated'
        })
    }
    res.status(200).send(updateQuiz);
})
// POST
// router.post(`/`,(req, res)=>{
//     const newquiz = new historyquizmodel({
//         keytopicid: req.body.keytopicid,
//         materialid: req.body.materialid,
//         name: req.body.name,
//         duedate: req.body.duedate,
//         progress: req.body.progress
//     }) 
//     newquiz.save().then((createquiz => {
//         res.status(201).json(createquiz)
//     })).catch((err)=>{
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })
// })

// NEW POST
router.post(`/`, async (req, res)=>{

    let result = null;

    // POST Comprehensive
    if(req.query.folderid)
    {
        // Find FolderId
        const folderdata = await foldermodel.findOne({_id: req.query.folderid});

        // POST History Quizz
        let newhistoryquiz = new historyquizmodel({
            folderid: folderdata?._id,
            progress: req.body.quizzes.progress,
        })
        newhistoryquiz = await newhistoryquiz.save();

        // POST History Details
        const details = req.body?.details?.map(async (historyDetail) => {

            const newHistoryDetails = new historydetailmodel({
                historyquizid: newhistoryquiz._id,
                folderid: folderdata?._id,
                answer: historyDetail.answer,
                correct: historyDetail.correct,
                correctanswer: historyDetail.correctanswer,
                index: historyDetail.index,
                question: historyDetail.question,
            })
            const savedDetail = await newHistoryDetails.save();
        })

        result = {
            quizzid: newhistoryquiz._id,
            folderid: folderdata._id,
        }
    } 
    // POST Keytopic
    else if(req.query.keytopicid){
        // Find Keytopic
        const keytopicdata = await keytopicmodel.findOne({_id: req.query.keytopicid});

        // Find FolderId
        const folderdata = await foldermodel.findOne({_id: keytopicdata?.folderid});

        // POST History Quizz
        let newhistoryquiz = new historyquizmodel({
            keytopicid: keytopicdata?._id,
            progress: req.body.quizzes.progress,
        })
        newhistoryquiz = await newhistoryquiz.save();

        // POST History Details
        const details = req.body?.details?.map(async (historyDetail) => {

            const newHistoryDetails = new historydetailmodel({
                historyquizid: newhistoryquiz._id,
                folderid: folderdata?._id,
                answer: historyDetail.answer,
                correct: historyDetail.correct,
                correctanswer: historyDetail.correctanswer,
                index: historyDetail.index,
                question: historyDetail.question,
            })
            const savedDetail = await newHistoryDetails.save();
        })

        result = {
            quizzid: newhistoryquiz._id,
            folderid: folderdata._id,
        }
    }    

    res.status(200).send(result);
})

// DELETE
router.delete('/:id',(req,res)=>{
    historyquizmodel.findByIdAndRemove(req.params.id).then(deleteQuiz => {
        if(deleteQuiz){
            return res.status(200).json({
                success: true,
                message:'The Quiz was deleted.'
            })
        }else{
            return res.status(404).json({
                success: false,
                message:'Quiz not found.'
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
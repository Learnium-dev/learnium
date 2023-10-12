const express = require('express');
const router = express.Router();
// Calling Detail Model
const {detailmodel} = require('../models/details');

// GET
router.get(`/`, async (req, res)=>{
    const detailList = await detailmodel.find();

    if(!detailList){
        res.status(500).json({
            success:false,
            message:'There are no Details'
        })
    }
    res.status(200).send(detailList);
})

// GET - Find by Id
router.get(`/:id`, async (req, res)=>{
    const detailList = await detailmodel.findById(req.params.id);

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
    const updateDetails = await detailmodel.findByIdAndUpdate(
        req.params.id,
        {
            flashcardid: req.body.flashcardid,
            quizid: req.body.quizid,
            progress: req.body.progress,
            isvalid: req.body.isvalid,
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

    const newDetail = new detailmodel({
        flashcardid: req.body.flashcardid,
        quizid: req.body.quizid,
        progress: req.body.progress,
        isvalid: req.body.isvalid,
        answer: req.body.answer,
        question: req.body.question,
        correctanswer: req.body.correctanswer,
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
    detailmodel.findByIdAndRemove(req.params.id).then(deletedetail => {
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
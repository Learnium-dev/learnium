const express = require('express');
const router = express.Router();
// Calling Quiz Model
const {quizmodel} = require('../models/quizzes');

// GET
router.get(`/`, async (req, res)=>{

    // Filter by Date
    let filter = {};
    let startdate = new Date(req.query.startdate);
    let enddate = new Date(req.query.enddate);
    enddate.setHours(enddate.getHours()+23, 59, 59, 999);
    
    if (startdate && enddate) {
        filter = {duedate: { $gte: startdate, $lte: enddate }}
    }

    const quizzesList = await quizmodel.find(filter).populate('keytopicid').sort({ duedate: 1 });

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
    const quizzesList = await quizmodel.findById(req.params.id);
    if(!quizzesList){
        res.status(500).json({
            success:false,
            message:'The quiz could not be found'
        })
    }
    res.status(200).send(quizzesList);
})

// GET - Find by duedate
// router.get(`/duedate`,async (req, res)=>{
//     // Filter by User Id
//     let filter = {};
//     if(req.query.userid){
//         filter = {userid: req.query.userid}
//     }

//     const folderList = await foldermodel.find(filter);
//     // const quizzesList = await quizmodel.find({ duedate: { $gte: req.body.duedate}}).populate('keytopicid');

//     // if(!quizzesList){
//     //     res.status(500).json({
//     //         success:false,
//     //         message:'There are no Quizzes'
//     //     })
//     // }
//     // res.status(200).send(quizzesList);
// })

// UPDATE
router.put(`/:id`, async (req, res)=>{
    const updateQuiz = await quizmodel.findByIdAndUpdate(
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
router.post(`/`,(req, res)=>{
    const newquiz = new quizmodel({
        keytopicid: req.body.keytopicid,
        materialid: req.body.materialid,
        name: req.body.name,
        duedate: req.body.duedate,
        progress: req.body.progress
    }) 
    newquiz.save().then((createquiz => {
        res.status(201).json(createquiz)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})
// DELETE
router.delete('/:id',(req,res)=>{
    quizmodel.findByIdAndRemove(req.params.id).then(deleteQuiz => {
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
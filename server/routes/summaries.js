const express = require('express');
const router = express.Router();

// Calling Summary Model
const {summarymodel} = require('../models/summaries');

// GET
router.get(`/`, async (req, res)=>{
    const allSumaries = await summarymodel.find();

    if(!allSumaries){
        res.status(500).json({
            success:false,
            message:'There are no Summaries'
        })
    }
    res.status(200).send(allSumaries);
})

// GET - Find by Id
router.get(`/:id`, async (req, res)=>{
    const summary = await summarymodel.findById(req.params.id);

    if(!summary){
        res.status(500).json({
            success:false,
            message:'The summary could not be found'
        })
    }
    res.status(200).send(summary);
})

// UPDATE
router.put(`/:id`, async (req, res)=>{
    const updateSummmary = await summarymodel.findByIdAndUpdate(
        req.params.id,
        {
            keytopicid: req.body.keytopicid,
            materialid: req.body.materialid,
            summary: req.body.summary,
            duedate: req.body.duedate,
            progress: req.body.progress,
        },
        {
            new: true
        });

    if(!updateSummmary){
        res.status(400).json({
            success:false,
            message:'The summary could not be updated'
        })
    }
    res.status(200).send(updateSummmary);
})

// POST
router.post(`/`,(req, res)=>{

    const newSummary = new summarymodel({
        keytopicid: req.body.keytopicid,
        materialid: req.body.materialid,
        summary: req.body.summary,
        duedate: req.body.duedate,
        progress: req.body.progress,
    }) 

    newSummary.save().then((createSummary => {
        res.status(201).json(createSummary)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// DELETE
router.delete('/:id',(req,res)=>{
    summarymodel.findByIdAndRemove(req.params.id).then(deleteSummary => {
        if(deleteSummary){
            return res.status(200).json({
                success: true,
                message:'The Summary was deleted.'
            })
        }else{
            return res.status(404).json({
                success: false,
                message:'Summary not found.'
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
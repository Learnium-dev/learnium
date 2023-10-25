const express = require('express');
const router = express.Router();
// Calling Keytopic Model
const {keytopicmodel} = require('../models/keytopics');
// const moment = require('moment-timezone');

// GET
router.get(`/`, async (req, res)=>{

    const keytopicList = await keytopicmodel.find();

    if(!keytopicList){
        res.status(500).json({
            success:false,
            message:'There are no Keytopics'
        })
    }
    res.status(200).send(keytopicList);
})

// GET - Find by Id
router.get(`/:id`, async (req, res)=>{
    const keytopicList = await keytopicmodel.findById(req.params.id);

    if(!keytopicList){
        res.status(500).json({
            success:false,
            message:'The Keytopic could not be found'
        })
    }
    res.status(200).send(keytopicList);
})

// UPDATE
router.put(`/:id`, async (req, res)=>{
    const updateKeytopic = await keytopicmodel.findByIdAndUpdate(
        req.params.id,
        {
            materialid: req.body.materialid,
            name: req.body.name,
            progress: req.body.progress,
        },
        {
            new: true
        });

    if(!updateKeytopic){
        res.status(400).json({
            success:false,
            message:'The keytopic could not be updated'
        })
    }
    res.status(200).send(updateKeytopic);
})

// POST
router.post(`/`,(req, res)=>{

    const newKeytopic = new keytopicmodel({
        materialid: req.body.materialid,
        name: req.body.name,
        progress: req.body.progress,
    }) 

    newKeytopic.save().then((createKeytopic => {
        res.status(201).json(createKeytopic)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// DELETE
router.delete('/:id',(req,res)=>{
    keytopicmodel.findByIdAndRemove(req.params.id).then(deleteKeytopic => {
        if(deleteKeytopic){
            return res.status(200).json({
                success: true,
                message:'The Keytopic was deleted.'
            })
        }else{
            return res.status(404).json({
                success: false,
                message:'Keytopic not found.'
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
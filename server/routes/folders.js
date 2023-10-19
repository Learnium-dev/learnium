const express = require('express');
const router = express.Router();
// Calling Folder Model
const {foldermodel} = require('../models/folders');

// GET
router.get(`/`, async (req, res)=>{

    // Filter by User Id
    let filter = {};
    if(req.query.userid){
        filter = {userid: req.query.userid}
    }

    const folderList = await foldermodel.find(filter);

    if(!folderList){
        res.status(500).json({
            success:false,
            message:'There are no Folders'
        })
    }
    res.status(200).send(folderList);
})

// GET - Find by Id
router.get(`/:id`, async (req, res)=>{
    const folderList = await foldermodel.findById(req.params.id);

    if(!folderList){
        res.status(500).json({
            success:false,
            message:'The Folder could not be found'
        })
    }
    res.status(200).send(folderList);
})

// UPDATE
router.put(`/:id`, async (req, res)=>{
    const updateFolder = await foldermodel.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            userid: req.body.userid,
        },
        {
            new: true
        });

    if(!updateFolder){
        res.status(400).json({
            success:false,
            message:'The folder could not be updated'
        })
    }
    res.status(200).send(updateFolder);
})

// POST
router.post(`/`,(req, res)=>{

    const newfolder = new foldermodel({
        name: req.body.name,
        userid: req.body.userid,
    }) 

    newfolder.save().then((createfolder => {
        res.status(201).json(createfolder)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// DELETE
router.delete('/:id',(req,res)=>{
    foldermodel.findByIdAndRemove(req.params.id).then(deletefolder => {
        if(deletefolder){
            return res.status(200).json({
                success: true,
                message:'The Folder was deleted.'
            })
        }else{
            return res.status(404).json({
                success: false,
                message:'Folder not found.'
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
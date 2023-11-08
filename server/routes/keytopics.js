const express = require('express');
const router = express.Router();
// Calling Keytopic Model
const {keytopicmodel} = require('../models/keytopics');
// User API
const {usermodel} = require('../models/users');
// Calling Folder Model
const {foldermodel} = require('../models/folders');
// GET
router.get(`/`, async (req, res)=>{
    // Find UserId
    const userdata = await usermodel.findOne({email: req.query.email});
    console.log("userdata",userdata)
    const folderdata = await foldermodel.findOne({userid: userdata?._id});
    console.log("🚀 ~ file: keytopics.js:15 ~ folderdata:", folderdata)
    // Filter by Date
    let filter = {};
    let startdate;
    let enddate;
    console.log("req.query.startdate",req.query.startdate)
    console.log("req.query.enddate",req.query.enddate)
    if (req.query.startdate && req.query.enddate){
        startdate = new Date(req.query.startdate);
        enddate = new Date(req.query.enddate);
        enddate.setHours(enddate.getHours()+23, 59, 59, 999);
        filter = {duedate: { $gte: startdate, $lte: enddate }, folderid: folderdata?._id}
    }
    // Filter by Folder Id
    else{
        filter = { folderid: folderdata?._id }
    }
    console.log("filter",filter)
    const keytopicList = await keytopicmodel.find(filter).populate({
        path: 'folderid',
        select: '_id name'
      });
    if(!keytopicList){
      
        res.status(500).json({
            success:false,
            message:'There are no Keytopics'
        })
    }
    console.log("🚀 ~ file: keytopics.js:35 ~ keytopicList:", keytopicList)
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
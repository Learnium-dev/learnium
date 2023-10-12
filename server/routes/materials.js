const express = require('express');
const router = express.Router();
// Calling Material Model
const {materialmodel} = require('../models/materials');

// GET
router.get(`/`, async (req, res)=>{
    const materialList = await materialmodel.find();

    if(!materialList){
        res.status(500).json({
            success:false,
            message:'There are no Materials'
        })
    }
    res.status(200).send(materialList);
})

// GET - Find by Id
router.get(`/:id`, async (req, res)=>{
    const materialList = await materialmodel.findById(req.params.id);

    if(!materialList){
        res.status(500).json({
            success:false,
            message:'The material could not be found'
        })
    }
    res.status(200).send(materialList);
})

// UPDATE
router.put(`/:id`, async (req, res)=>{
    const updateMaterial = await materialmodel.findByIdAndUpdate(
        req.params.id,
        {
            folderid: req.body.folderid,
            name: req.body.name,
            content: req.body.content,
            url: req.body.url,
            exam: req.body.exam,
            examdate: req.body.examdate,
        },
        {
            new: true
        });

    if(!updateMaterial){
        res.status(400).json({
            success:false,
            message:'The material could not be updated'
        })
    }
    res.status(200).send(updateMaterial);
})

// POST
router.post(`/`,(req, res)=>{

    const newMaterial = new materialmodel({
        folderid: req.body.folderid,
        name: req.body.name,
        content: req.body.content,
        url: req.body.url,
        exam: req.body.exam,
        examdate: req.body.examdate,
    }) 

    newMaterial.save().then((createMaterial => {
        res.status(201).json(createMaterial)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// DELETE
router.delete('/:id',(req,res)=>{
    materialmodel.findByIdAndRemove(req.params.id).then(deleteMaterial => {
        if(deleteMaterial){
            return res.status(200).json({
                success: true,
                message:'The Material was deleted.'
            })
        }else{
            return res.status(404).json({
                success: false,
                message:'Material not found.'
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
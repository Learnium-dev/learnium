const express = require('express');
const router = express.Router();

// Calling User Model
const {usermodel} = require('../models/users');

// GET
router.get(`/`, async (req, res)=>{
    const allUsers = await usermodel.find();

    if(!allUsers){
        res.status(500).json({
            success:false,
            message:'There are no Users'
        })
    }
    res.status(200).send(allUsers);
})

// GET - Find by Id
router.get(`/:id`, async (req, res)=>{
    const user = await usermodel.findById(req.params.id);

    if(!user){
        res.status(500).json({
            success:false,
            message:'The user could not be found'
        })
    }
    res.status(200).send(user);
})

// UPDATE
router.put(`/:id`, async (req, res)=>{
    const updateUser = await usermodel.findByIdAndUpdate(
        req.params.id,
        {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            notification: req.body.notification,
        },
        {
            new: true
        });

    if(!updateUser){
        res.status(400).json({
            success:false,
            message:'The user could not be updated'
        })
    }
    res.status(200).send(updateUser);
})

// POST
router.post(`/`,(req, res)=>{

    const newuser = new usermodel({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        notification: req.body.notification,
    }) 

    newuser.save().then((createuser => {
        res.status(201).json(createuser)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// DELETE
router.delete('/:id',(req,res)=>{
    usermodel.findByIdAndRemove(req.params.id).then(deleteuser => {
        if(deleteuser){
            return res.status(200).json({
                success: true,
                message:'The User was deleted.'
            })
        }else{
            return res.status(404).json({
                success: false,
                message:'User not found.'
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
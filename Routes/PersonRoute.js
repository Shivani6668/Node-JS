const express = require('express')
const router = express.Router()
const personModel = require('../Model/PersonModel')

router.post("/person",async (req,res)=>{
    try {
        const data = req.body
        const newPerson = new personModel(data)
        const response = await newPerson.save()
        console.log("data is saved");
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'})
    }
})

router.get("/person", async (req,res)=>{
    try {
        const data =await personModel.find()
        console.log(data);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})


router.get("/:worktype", async (req,res)=>{
    try {
        const worktype = req.params.worktype;
        if(worktype == 'chef' || worktype == 'waiter'){
            const response = await personModel.find({work:worktype})
            console.log("data fetched");
            res.status(200).json(response)
        }else{
            res.status(404).json({message:"client side error"})
        }
    } catch (error) {
        res.status(500).json({message:"Internal error"})
    }
})

router.put("/:id",async (req,res)=>{
    try {
        const id = req.params.id;
        const updateresponse = req.body
        const response = await personModel.findByIdAndUpdate(id,updateresponse,{
            new:true, //return the  updated document
            runValidators:true //Run mongoose validator
        })        
        console.log("data updated");
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
} )


router.delete("/:id",async (req,res)=>{
    try {
        const id = req.params.id
        const response = await personModel.findByIdAndDelete(id)
        if(!response){
            res.status(404).json({message:"client side error"})
        }
        console.log("deleted successfully");
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
} )

module.exports = router



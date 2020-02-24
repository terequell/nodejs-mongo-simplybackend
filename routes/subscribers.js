const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// getting all
router.get('/', async (req,res) => {
   try {
      const subscribers = await Subscriber.find()
      res.status(200).json(subscribers)
   }
   catch (err) {
      res.status(500).json({message: err.message})
   }
})

// getting one
router.get('/:id', getSub, (req,res) => {
    res.json(res.subscriber)
})

// creating one
router.post('/', async (req,res) => {
   const subscriber = new Subscriber({
      name: req.body.name,
      subscribedToChannel: req.body.subscribedToChannel
   })
   try {
      const newSub = await subscriber.save()
      res.status(201).json(newSub) //201 - succesfully created object
   }
   catch (err) {
      res.status(400).json(err.message)
   }
})

// updating one
router.patch('/:id', getSub, async (req,res) => {
   if (req.body.name != null) {
      res.subscriber.name = req.body.name
   }
   if (req.body.subscribedToChannel != null) {
      res.subscriber.subscribedToChannel = req.body.subscribedToChannel
   }
   try {
      const updatedSub = await res.subscriber.save()
      res.json(updatedSub)
   }
   catch (err) {
      res.status(400).json({message: err.message})
   }
})

// deleting one
router.delete('/:id', getSub, async (req,res) => {
   try {
      await res.subscriber.remove()
      res.json({message: "User has been removed"})
   }
   catch (err) {
      console.log(err)
      res.status(500).json({ message: err.message})
   }  
})


async function getSub (req,res,next)  {
   let subscriber
   try {
      subscriber = await Subscriber.findById(req.params.id)  
      if (subscriber == null) {
         return res.status(404).json({message: "Can't find subscriber"})
      }
   }
   catch(err) {
      return res.status(500).json({message : err.message})
   }
   res.subscriber = subscriber
   next()
}  

module.exports = router
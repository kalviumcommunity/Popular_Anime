const express = require('express');
const router = express.Router();
const anime = require('./schema');
const Joi = require("joi");
const { validateAnime } = require("./validator"); 
const person = require('./userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config
router.get('/', async (req, res) => {
    try {
        const animes = await anime.find();
        res.json(animes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const animeFound = await anime.findById(req.params.id);
        if (!animeFound) {
            return res.status(404).json({ error: "Anime not found" });
        }
        res.json(animeFound);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/add-anime', async (req, res) => {
    try {
        const validationResult = validateAnime(req.body);
        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details.map(detail => detail.message) });
        }
        const newAnime = new anime(req.body);
        const saveAnime = await newAnime.save();
        res.json(saveAnime);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/updateAni/:id', async (req, res) => {
    try {
        const updatedAnime = await anime.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAnime) {
            return res.status(404).json({ error: "Anime not found" });
        }
        res.json(updatedAnime);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/deleteAni/:id', async (req, res) => {
    try {
        const deletedAnime = await anime.findByIdAndDelete(req.params.id);
        if (!deletedAnime) {
            return res.status(404).json({ error: "Anime not found" });
        }
        res.json({ message: "Anime deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// for user login
router.post('/signup',async(req,res)=>{
    try{
        const user = await person.create({
            userName:req.body.userName,
            password:req.body.password
        })
        res.send(user)
    }catch(err){
        console.error(err)
    }
  
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await person.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid username / password' });
        }else{
            res.status(200).json({ message:'login sucessful' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/logout',(req,res)=>{
    res.clearCookie('username')
    res.clearCookie('password')
  
    res.status(200).json({message:'Logout succesful'})
  })
  router.post('/auth', async(req,res) => {
    try{
        const {username,password} = req.body
    const user = {
        "username" : username,
        "password" : password
    }
    const ACCESS_TOKEN = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
    res.cookie('token',ACCESS_TOKEN,{maxAge:365*24*60*60*100})
    res.json({ "accessToken": ACCESS_TOKEN });
  }catch(err){
    console.error(err)
    res.status(500).json({error:'Internal Server Error'})
  }
  });
module.exports = router;
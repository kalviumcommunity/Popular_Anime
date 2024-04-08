const express = require('express');
const router = express.Router();
const anime = require('./schema');
const Joi = require("joi");
const { validateAnime } = require("./validator"); 
const person = require('./userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/anime', async (req, res) => {
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

router.get('/anime/:updated_user', async (req, res) => {
    try {
        const animesFound = await anime.find({ updated_user: req.params.updated_user });
        if (animesFound.length === 0) {
            return res.status(404).json({ error: "No animes found for the specified updated_user" });
        }
        res.json(animesFound);
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

router.put('/updateani/:id', async (req, res) => {
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


router.get('/users/names', async (req, res) => {
    try {
        const users = await person.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await person.findOne({ userName: username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const user = await person.create({
            userName: req.body.userName,
            password: req.body.password
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await person.findOne({ userName: userName, password: password });
        
        if (user) {
            const token = jwt.sign({ userId: user.userName }, process.env.ACCESS_TOKEN);
            return res.json({ 
                message: "Login Successful", 
                name: user.userName, 
                userId: user._id,
                accessToken: token 
            });
        } else {
            return res.status(401).json({ error: 'Invalid username / password' });
        }
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post('/logout', (req, res) => {
    res.clearCookie('access_token'); // Clear the JWT token cookie
    res.status(200).json({ message: 'Logout successful' });
});
module.exports = router;
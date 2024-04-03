const express = require('express');
const router = express.Router();
const anime = require('./scheema');

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
            return res.status(404).json({ error: "anime not found" });
        }
        res.json(animeFound);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/add-anime', async (req, res) => {
    const newAnime = new anime({
        AnimeId: req.body.AnimeId,
        anime:req.body.anime,
        authorname: req.body.authorname,
        start_date: req.body.start_date,
        theme: req.body.theme,
        character: req.body.character,
    });
    try {
        const saveAnime = await newAnime.save();
        res.json(saveAnime);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;
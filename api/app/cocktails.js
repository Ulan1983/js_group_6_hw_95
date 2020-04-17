const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const Cocktail = require('../models/Cocktail');
const config = require('../config');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, config.uploadPath);
	},
	filename: (req, file, cb) => {
		cb(null, nanoid() + path.extname(file.originalname));
	}
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const cocktails = await Cocktail.find({published: true});

		if (!cocktails) {
			return res.status(404).send({message: "Not found!"});
		}
		return res.send(cocktails);
	} catch (error) {
		return res.status(404).send({message: "Not found", error});
	}
});

router.get('/all', async (req, res) => {
	try {
		const cocktails = await Cocktail.find();

		if (!cocktails) {
			return res.status(404).send({message: "Not found!"});
		}
		return res.send(cocktails);
	} catch (error) {
		return res.status(404).send({message: "Not found", error});
	}
});

router.get('/myCocktails', auth, async (req, res) => {
	try {
		const cocktails = await Cocktail.find({user: req.user._id});

		if (!cocktails) {
			return res.status(404).send({message: "Not found!"});
		}
		return res.send(cocktails);
	} catch (error) {
		return res.status(404).send({message: "Not found", error});
	}
});

router.get('/:id', async (req, res) => {
	try {
		const cocktail = await Cocktail.findById(req.params.id);

		if (!cocktail) {
			return res.status(400).send({error: "Not found!"});
		}

		return res.send(cocktail);
	} catch (error) {
		return res.status(400).send({error: "Not found!"});
	}
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
	const cocktailData = req.body;

	if (req.file) {
		cocktailData.image = req.file.filename;
	}

	const ingr = JSON.parse(cocktailData.ingredients);

	const cocktail = new Cocktail({
		title: cocktailData.title,
		image: cocktailData.image,
		recipe: cocktailData.recipe,
		ingredients: ingr,
		user: req.user,
	});

	try {
		await cocktail.save();

		return res.send(cocktail);
	} catch (error) {
		return res.status(400).send(error);
	}
});

router.post('/:id/published', [auth, permit('admin')], async (req, res) => {
	try {
		const cocktail = await Cocktail.findById(req.params.id);
		cocktail.published = true;

		await cocktail.save();

		return res.send(cocktail);
	} catch (error) {
		return res.status(400).send(error);
	}
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
	try {
		await Cocktail.deleteOne({_id: req.params.id});

		return res.send({message: 'Deleted successfully!'});
	} catch (error) {
		return res.status(400).send(error);
	}
});

module.exports = router;
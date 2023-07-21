const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const quotesCtrl = require('../controllers/quotes');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /movies
router.get('/', quotesCtrl.index);
// GET /movies/new
router.get('/new', ensureLoggedIn, quotesCtrl.new);
// GET /movies/:id (show functionality) MUST be below new route
router.get('/:id', quotesCtrl.show);
// POST /movies
router.post('/', ensureLoggedIn, quotesCtrl.create);
	
module.exports = router;

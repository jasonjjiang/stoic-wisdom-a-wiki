const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const quotesCtrl = require('../controllers/quotes');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /quotes
router.get('/', quotesCtrl.index);
// GET /quotes/new
router.get('/new', ensureLoggedIn, quotesCtrl.new);
// GET /quotes/:id (show functionality) MUST be below new route
// POST /quotes
router.post('/', ensureLoggedIn, quotesCtrl.create);

router.get('/', ensureLoggedIn, quotesCtrl.show);
	
module.exports = router;

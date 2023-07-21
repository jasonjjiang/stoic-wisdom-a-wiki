const express = require('express');
const router = express.Router();
const opinionsCtrl = require('../controllers/opinions');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /movies/:id/reviews (create review for a movie)
router.post('/quotes/:id/opinions', ensureLoggedIn, opinionsCtrl.create);
// DELETE /reviews
router.delete('/opinions/:id', ensureLoggedIn, opinionsCtrl.delete);

module.exports = router;
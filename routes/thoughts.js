const express = require('express');
const router = express.Router();
const thoughtsCtrl = require('../controllers/thoughts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /quotes/:id/thoughts (create thought for a quote)
router.post('/quotes/:id/thoughts', ensureLoggedIn, thoughtsCtrl.create);
// DELETE /thoughts (delete thought for a quote)
router.delete('/thoughts/:id', ensureLoggedIn, thoughtsCtrl.delete);

module.exports = router;
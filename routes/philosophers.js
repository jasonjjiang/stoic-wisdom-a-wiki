const express = require('express');
const router = express.Router();
const philosophersCtrl = require('../controllers/philosophers');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// This router is mounted to a "starts with" path of '/'

// GET /performers/new (new functionality)
router.get('/philosophers/new', ensureLoggedIn, philosophersCtrl.new);
// POST /performers (create functionality)
router.post('/philosophers', ensureLoggedIn, philosophersCtrl.create);
// POST /movies/:id/performers (associate a performer with a movie)
router.post('/quotes/:id/philosophers', ensureLoggedIn, philosophersCtrl.addToCast);

module.exports = router;
const Quote = require('../models/quote');

module.exports = {
  index,
  show,
  new: newQuote,
  create
};

async function index(req, res) {
  const quotes = await Quote.find({});
  res.render('quotes/index', { title: 'All Quotes', quotes });
}

async function show(req, res) {

  res.render('quotes/show', { quote: 'Quote Detail', quote});
}

function newQuote(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('quotes/new', { title: 'Add Quote', errorMsg: '' });
}

async function create(req, res) {
    // Update this line because now we need the _id of the new movie
    try { const quote = await Quote.create(req.body);
    // Redirect to the new quote's show functionality 
    res.redirect(`/quotes/${quote._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('quotes/new', { errorMsg: err.message });
  }
}
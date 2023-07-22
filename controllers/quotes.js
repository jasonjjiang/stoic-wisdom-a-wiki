const Quote = require('../models/quote');
const Philosopher = require('../models/philosopher');

module.exports = {
  index,
  show,
  new: newQuote,
  create
};

async function index(req, res) {
  const movies = await Quote.find({});
  res.render('quotes/index', { title: 'All Quotes', quotes });
}

async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const quote = await Quote.findById(req.params.id).populate('cast');
  // Mongoose query builder approach to retrieve performers not the movie:
    // Performer.find({}).where('_id').nin(movie.cast)
  // The native MongoDB approach uses a query object to find 
  // performer docs whose _ids are not in the movie.cast array like this:
  const performers = await Performer.find({ _id: { $nin: quote.cast } }).sort('name');
  res.render('quotes/show', { title: 'Quote Detail', quote, performers });
}

function newQuote(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('quotes/new', { title: 'Add Quote', errorMsg: '' });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new movie
    const quote = await Quote.create(req.body);
    // Redirect to the new movie's show functionality 
    res.redirect(`/quotes/${quote._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('quotes/new', { errorMsg: err.message });
  }
}
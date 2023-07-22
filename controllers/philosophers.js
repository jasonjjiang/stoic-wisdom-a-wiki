const Philosopher = require('../models/philosopher');
const Quote = require('../models/quote');

module.exports = {
  new: newPhilosopher,
  create,
  addToQuote
};

async function addToQuote(req, res) {
  const quote = await Quote.findById(req.params.id);
  // The cast array holds the performer's ObjectId (referencing)
  quote.cast.push(req.body.performerId);
  await quote.save();
  res.redirect(`/quotes/${quote._id}`);
}

async function newPhilosopher(req, res) {
  //Sort performers by their name
  const philosophers = await Philosopher.find({}).sort('name');
  res.render('philosophers/new', { title: 'Add Philosopher', philosophers });
}

async function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  // Fix by either reformatting to "MM-DD-YYYY" or by 
  // appending a "time" fragment like this... 
  req.body.born += 'T00:00';
  try {
    await Philosopher.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/philosophers/new');
}
const Quote = require('../models/quote');

module.exports = {
  create,
  delete: deleteThoughts,
};


async function deleteThoughts(req, res) {
  const quote = await Quote.findOne({ 'thoughts._id': req.params.id, 'thoughts.user': req.user._id });
  if (!quote) return res.redirect('/quotes');
  quote.thoughts.remove(req.params.id);
  await quote.save();
  res.redirect(`/quotes/${quote._id}`);
}

async function create(req, res) {
  const quote = await Quote.findById(req.params.id);

  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  quote.thoughts.push(req.body);
  try {
    // Save any changes made to the movie doc
    await quote.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/quotes/${quote._id}`);
}
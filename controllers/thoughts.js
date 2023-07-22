const QUOTE = require('../models/quote');

module.exports = {
  create,
  // Add this export
  delete: deleteThoughts
};

async function deleteThoughts(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const quote = await Quote.findOne({ 'quotes._id': req.params.id, 'quotes.user': req.user._id });
  // Rogue user!
  if (!quote) return res.redirect('/quotes');
  // Remove the quote using the remove method available on Mongoose arrays
  quote.quotes.remove(req.params.id);
  // Save the updated movie doc
  await quote.save();
  // Redirect back to the quote's show view
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
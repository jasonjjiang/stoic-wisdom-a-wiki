require('dotenv').config();
require('./config/database');

const Quote = require('./models/quote');

// For better organization, the seed data is being stored in a separate data.js module
const data = require('./data');

// await needs an async function - use an async IIFE!
(async function() {
  // Save the promises (or call right in the array if feeling frisky)
  const p1 = Quote.deleteMany({});
  
  // Promise.all will return a single promise that resolves
  // only after all of the array's promises resolve
  let results = await Promise.all([p1]);
  // results will be an array of result objects!
  console.log(results);

  // This time, provide the array of promises in-line
  results = await Promise.all([
    Quote.create(data.quotes),
  ]);
  console.log('Created quotes:', results[0]);

  process.exit();
})();


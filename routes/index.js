const router = require('express').Router();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Get API data
const url = 'https://api.api-ninjas.com/v1/dadjokes?limit=1';
const options = {
  method: 'GET',
  headers: {
    'X-Api-Key': process.env.API_KEY,
  },
};

router.get('/', ensureAuth, async (req, res) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.render('index', { joke: JSON.stringify(data[0].joke) });
  } catch (error) {
    console.log(error);
  }
});

router.get('/login', ensureGuest, (req, res) => {
  res.render('login');
  // res.render('index', { userinfo: req.user });
});
module.exports = router;

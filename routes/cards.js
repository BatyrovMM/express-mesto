const cards = require('express').Router();
const fs = require('fs');
const path = require('path');

const cardsPath = path.join('data', 'cards.json');
const cardsJson = fs.readFileSync(cardsPath);
const cardsJs = JSON.parse(cardsJson);

cards.get('/cards', (req, res) => {
  res.send(cardsJs);
});

module.exports = cards;

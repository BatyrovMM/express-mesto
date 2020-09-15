const cards = require('express').Router();
const fs = require('fs');
const path = require('path');

const cardsPath = path.join('data', 'cards.json');

cards.get('/cards', (req, res) => {
  fs.readFile(cardsPath, (err, data) => {
    try {
      if (err) {
        console.log(err);
        return;
      }

      const cardsJs = JSON.parse(data);
      res.send(cardsJs);
    } catch (e) {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  });
});

module.exports = cards;

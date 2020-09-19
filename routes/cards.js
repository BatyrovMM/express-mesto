const cards = require('express').Router();
const {
  getCards,
  getCardById,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cards.get('/cards', getCards);
cards.get('/cards/:CardId', getCardById);
cards.delete('/cards/:CardId', deleteCardById);
cards.post('/cards', createCard);
cards.put('/cards/:cardId/likes', likeCard);
cards.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cards;

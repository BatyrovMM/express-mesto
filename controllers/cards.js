const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new Error('notExist'))
    .populate('owner')
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'notExist') {
        res.status(404).send({ message: 'Нет карточки с таким id!' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(new Error('notExist'))
    .then(() => res.send({ message: 'Удаление прошло успешно!' }))
    .catch((err) => {
      if (err.message === 'notExist') {
        res.status(404).send({ message: 'Нет карточки с таким id!' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные введены неверно!' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('notExist'))
    .then(() => res.send({ message: 'Лайк' }))
    .catch((err) => {
      if (err.message === 'notExist') {
        res.status(404).send({ message: 'Карточки не существует!' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('notExist'))
    .then(() => res.send({ message: 'Дизлайк' }))
    .catch((err) => {
      if (err.message === 'notExist') {
        res.status(404).send({ message: 'Карточки не существует!' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports = {
  getCards,
  getCardById,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
};

const User = require('../models/user');

const myUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const myUserUpdateInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
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

const myUserUpdateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
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

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(new Error('notExist'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'notExist') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные введены неверно!' });
      } else {
        res.status(400).send({ message: err.message });
      }
    });
};

module.exports = {
  myUser,
  myUserUpdateInfo,
  myUserUpdateAvatar,
  getUsers,
  getUserById,
  createUsers,
};

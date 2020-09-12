const users = require('express').Router();
const fs = require('fs');
const path = require('path');

const usersPath = path.join('data', 'users.json');
const usersJson = fs.readFileSync(usersPath);
const usersJs = JSON.parse(usersJson);

users.get('/users', (req, res) => {
  res.send(usersJs);
});

users.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = usersJs.find((item) => item._id === id);
  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }

  res.send(user);
});

module.exports = users;

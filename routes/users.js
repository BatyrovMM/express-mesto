const users = require('express').Router();
const fs = require('fs');
const path = require('path');

const usersPath = path.join('data', 'users.json');

users.get('/users', (req, res) => {
  fs.readFile(usersPath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const usersJs = JSON.parse(data);
    res.send(usersJs);
  });
});

users.get('/users/:id', (req, res) => {
  fs.readFile(usersPath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const usersJs = JSON.parse(data);
    const { id } = req.params;
    const user = usersJs.find((item) => item._id === id);
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }

    res.send(user);
  });
});

module.exports = users;

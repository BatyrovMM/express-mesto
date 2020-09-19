const users = require('express').Router();
const {
  myUser,
  myUserUpdateInfo,
  myUserUpdateAvatar,
  getUsers,
  getUserById,
  createUsers,
} = require('../controllers/users');

users.get('/users/me', myUser);
users.patch('/users/me', myUserUpdateInfo);
users.patch('/users/me/avatar', myUserUpdateAvatar);
users.get('/users', getUsers);
users.get('/users/:id', getUserById);
users.post('/users', createUsers);

module.exports = users;

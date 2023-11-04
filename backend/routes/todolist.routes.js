const express = require('express');
const todolistController = require('../controllers/todolist.controller');

const routes = express.Router();

routes.route('/todolist')
    .get(todolistController.get)
    .post(todolistController.add);

routes.route('/todolist/:id')
    .put(todolistController.update)
    .delete(todolistController.remove);

module.exports = routes;
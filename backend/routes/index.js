const todolistRouter = require('./todolist.routes');

module.exports = (app) => {
    app.use('/',todolistRouter);
}
const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const todoService = require('../service/todoService');

router.get('/', async (req, res) => {
  try {
    const result = await todoService.getAll();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:todo_id', async (req, res) => {
  const { todo_id } = req.params;
  try {
    const result = await todoService.getById(todo_id);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await todoService.getByUserId(user_id);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post('/add', authorize, async (req, res) => {
  const todo = req.body; //req.body = {user_id,firstName,lastname,password,email}
  todo.user_id = req.user.id;
  try {
    const result = await todoService.addTodo(todo);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/delete/:id', authorize, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await todoService.deleteTodo(id);
    res.json('Todo was deleted');
  } catch (error) {
    console.log(error);
  }
});

router.post('/update', authorize, async (req, res) => {
  try {
    const result = await todoService.updateTodo(req.body);
    res.json('Todo Updated');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

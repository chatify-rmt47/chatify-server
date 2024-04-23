const UserController = require('../controllers/userController');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Server nyala way');
});

router.post('/signup', UserController.signUp);

router.get('/login', (req, res) => {
  res.send('Login ROUTE');
});

router.get('/logout', (req, res) => {
  res.send('Logout ROUTE');
});
module.exports = router;

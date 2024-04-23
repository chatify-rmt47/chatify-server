const UserController = require('../controllers/userController');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Server nyala way');
});

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

module.exports = router;

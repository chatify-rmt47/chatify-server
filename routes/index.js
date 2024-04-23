const MessageController = require('../controllers/MessageController');
const UserController = require('../controllers/userController');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Server nyala way');
});

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

router.post('/send-message/:id', MessageController.sendMessage)

module.exports = router;

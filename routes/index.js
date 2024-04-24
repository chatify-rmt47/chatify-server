const MessageController = require('../controllers/MessageController');
const UserController = require('../controllers/UserController');
const authentication = require('../middleware/authentication');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Server nyala way');
});

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

router.use(authentication);

router.get('/get-message/:id', MessageController.getMessage);

router.post('/send-message/:id', MessageController.sendMessage);

router.get('/get-user', UserController.getUserData);

module.exports = router;

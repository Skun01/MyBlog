const {Router} = require('express');
const userController = require('../controllers/userController');
const router = Router();

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/user/:userId', userController.getUserById);
module.exports = router;
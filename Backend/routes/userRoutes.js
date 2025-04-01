const {Router} = require('express');
const userController = require('../controllers/userController');
const router = Router();
const passport = require('../middleware/authMiddleware');
router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/user', passport.authenticate('jwt', {session: false}), userController.getUserById);
module.exports = router;
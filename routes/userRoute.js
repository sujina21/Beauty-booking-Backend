const router = require('express').Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.post('/register', userController.register_new_user);
router.post('/login', userController.login_user);


module.exports = router;
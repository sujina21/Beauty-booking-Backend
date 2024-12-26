const router = require('express').Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.post('/register', userController.register_new_user);
router.post('/login', userController.login_user);
router.get('/', auth.verifyUser, userController.get_user_profile);
router.patch('/', auth.verifyUser, userController.update_user_profile);


router.post('/reset-code', auth.verifyUser, userController.reset_password);

module.exports = router;
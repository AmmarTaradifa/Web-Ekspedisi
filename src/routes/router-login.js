const router = require('express').Router();
const loginController = require('../controllers').login;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogout, loginController.login);
// router.get('/login-cabang', verifyUser.isLogout, loginController.login);

router.get('/logout', loginController.logout);

router.post('/auth', loginController.loginAuth);
// router.post('/auth_cabang', loginController.loginAuthCabang);


module.exports = router;
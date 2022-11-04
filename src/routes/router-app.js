const router = require('express').Router();
const homeController = require('../controllers').home;
const loginController = require('../controllers').login;

// const barangController = require('../controllers').getDataBarang;
const verifyUser = require('../configs/verify');
const { cabang } = require('../controllers');
const { ongkir } = require('../controllers');
const { order } = require('../controllers');
const { user } = require('../controllers');


router.get('/user-cabang',verifyUser.isLogin, user.getDataUser);
router.get('/user',verifyUser.isLogin, user.getDataUserBySuper);
router.post('/tambah_user',verifyUser.isLogin, user.addDataUser);
router.post('/edit_user',verifyUser.isLogin, user.editDataUser);
router.post('/super_edit_user',verifyUser.isLogin, user.editDataUserBySuper);
router.post('/hapus_user',verifyUser.isLogin, user.deleteDataUser);
router.post('/super_hapus_user',verifyUser.isLogin, user.deleteDataUserBySuper);

router.get('/order',verifyUser.isLogin, order.getDataOrderBySuper);
router.get('/order-cabang',verifyUser.isLogin, order.getDataOrder);
router.post('/tambah_order',verifyUser.isLogin, order.addDataOrder);
router.post('/edit_order',verifyUser.isLogin, order.editDataOrder);
router.post('/hapus_order',verifyUser.isLogin, order.deleteDataOrder);


router.get('/ongkir',verifyUser.isLogin, ongkir.getDataOngkir);
router.post('/tambah_ongkir',verifyUser.isLogin, ongkir.addDataOngkir);
router.post('/edit_ongkir',verifyUser.isLogin, ongkir.editDataOngkir);
router.post('/hapus_ongkir',verifyUser.isLogin, ongkir.deleteDataOngkir);

router.get('/cabang',verifyUser.isLogin, cabang.getDataCabang);
router.post('/tambah_cabang',verifyUser.isLogin, cabang.addDataCabang);
router.post('/edit_cabang',verifyUser.isLogin, cabang.editDataCabang);
router.post('/hapus_cabang',verifyUser.isLogin, cabang.deleteDataCabang);

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/cek-resi',homeController.cekResi);
router.get('/cek-resi/:resi', homeController.cekResiByResi);
router.get('/home-cabang', verifyUser.isLogin, homeController.homeCabang);
router.get('/login-cabang', verifyUser.isLogout, loginController.loginCabang);
router.post('/login-cabang/auth_cabang', loginController.loginAuthCabang);


module.exports = router;
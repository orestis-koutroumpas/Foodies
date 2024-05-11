import express from 'express'

const router = express.Router();

const foodiesController = await import(`../controller/foodies-controller.mjs`)

//Καταχώριση συμπεριφοράς σε διάφορα path
router.route('/').get((req, res) => { res.redirect('/home') });

router.get('/home', foodiesController.homeController);
router.get('/about', foodiesController.aboutController);
router.get('/search', foodiesController.searchController);
router.get('/store', foodiesController.storeController);
router.get('/user-profile', foodiesController.userProfileController);

export default router;
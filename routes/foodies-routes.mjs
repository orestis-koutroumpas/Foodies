// routes/foodies-routes.mjs

import express from 'express';
import { footerPagesController } from '../controller/footer-pages-controller.mjs';

const router = express.Router();

router.route('/').get((req, res) => { 
    res.redirect('/home') 
});

router.get('/home', async (req, res) => {
    const { homeController } = await import(`../controller/home-controller.mjs`);
    homeController(req, res);
});

router.get('/search', async (req, res) => {
    const { searchController } = await import(`../controller/search-controller.mjs`);
    searchController(req, res);
});

router.get('/store/:storeName', async (req, res) => {
    const { storeController } = await import(`../controller/store-controller.mjs`);
    storeController(req, res);
});

router.get('/user-profile', async (req, res) => {
    const { userProfileController } = await import(`../controller/user-profile-controller.mjs`);
    userProfileController(req, res);
});

router.get('/about', footerPagesController);
router.get('/privacy-policy', footerPagesController);
router.get('/terms-of-use', footerPagesController);

export default router;
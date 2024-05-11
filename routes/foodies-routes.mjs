//foodies-routes.mjs

import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => { res.redirect('/home') });

router.get('/home', async (req, res) => {
    const { homeController } = await import(`../controller/home-controller.mjs`);
    homeController(req, res);
});

router.get('/about', async (req, res) => {
    const { aboutController } = await import(`../controller/about-controller.mjs`);
    aboutController(req, res);
});

router.get('/search', async (req, res) => {
    const { searchController } = await import(`../controller/search-controller.mjs`);
    searchController(req, res);
});

router.get('/store', async (req, res) => {
    const { storeController } = await import(`../controller/store-controller.mjs`);
    storeController(req, res);
});

router.get('/user-profile', async (req, res) => {
    const { userProfileController } = await import(`../controller/user-profile-controller.mjs`);
    userProfileController(req, res);
});

export default router;
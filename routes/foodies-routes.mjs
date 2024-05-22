// routes/foodies-routes.mjs

import express from 'express';
import { footerPagesController } from '../controller/footer-pages-controller.mjs';
import { getStoreInfo, getTabsByCategory } from '../controller/store-controller.mjs';
import { getMenuItemsWithPricesByStoreId } from '../model/model.mjs';
import { cartController } from '../controller/cart-controller.mjs';

const router = express.Router();

router.route('/').get((req, res) => { 
    res.redirect('/home') 
});

router.get('/home', async (req, res) => {
    const { homeController } = await import(`../controller/home-controller.mjs`);
    homeController(req, res);
});

router.get('/login', async (req, res) => {
    const { loginController } = await import(`../controller/login-controller.mjs`);
    loginController(req, res);
});

router.get('/search', async (req, res) => {
    const { searchController } = await import(`../controller/search-controller.mjs`);
    searchController(req, res);
});

router.get('/store/:storeName', async (req, res) => {
    const { storeController } = await import(`../controller/store-controller.mjs`);
    storeController(req, res);
});

router.get('/api/menu-items/:storeId', async (req, res) => {
    try {
        const { storeId } = req.params;
        const menuItemsWithPrices = await getMenuItemsWithPricesByStoreId(storeId);
        res.json(menuItemsWithPrices);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/api/store-info/:storeName', getStoreInfo);

router.get('/api/tabs/:category', getTabsByCategory);

router.get('/user-profile', async (req, res) => {
    const { userProfileController } = await import(`../controller/user-profile-controller.mjs`);
    userProfileController(req, res);
});

router.post('/user-profile', async (req, res) => {
    const { updateUserInfo } = await import(`../controller/user-profile-controller.mjs`);
    updateUserInfo(req, res);
});

router.get('/store/:storeName/cart-modal', cartController);

router.get('/store/:storeName/checkout', async (req, res) => {
    const { checkoutController } = await import(`../controller/checkout-controller.mjs`);
    checkoutController(req, res);
});

router.get('/about', footerPagesController);
router.get('/privacy-policy', footerPagesController);
router.get('/terms-of-use', footerPagesController);

export default router;
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('user_profile', {pageTitle: "User Profile"});
});

export default router;
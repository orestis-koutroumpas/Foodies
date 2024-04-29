import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('about', {pageTitle: "About Us"});
});

export default router;
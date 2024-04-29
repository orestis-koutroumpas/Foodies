import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('about', {aboutPage: true, pageTitle: "About Us"});
});

export default router;
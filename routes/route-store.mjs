import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.write("Store Page");
    res.end();
});

export default router;
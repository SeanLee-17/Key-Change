const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./productRoutes');

router.use('/users', userRoutes);
router.use('/product', productRoutes);

module.exports = router;

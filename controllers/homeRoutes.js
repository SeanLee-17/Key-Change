const router = require('express').Router();
const { Product , User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all product and JOIN with user data
    const productData = await Product.findAll({});

    // Serialize data so the template can read it
    const product = productData.map((product) => product.get({ plain: true }));

    let backgroundpic = "pages"
    if (req.session.logged_in) {
      backgroundpic = "main"
    }

    // Pass serialized data and session flag into template
    res.render('homepage', {
      product,
      logged_in: req.session.logged_in,
      name: req.session.name,
      layout: backgroundpic
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
    });

    const products = productData.get({ plain: true });

    res.render('products', {
      ...products,
      name: req.session.name,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      name: req.session.name,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('*', (req, res) => {
  res.render('404');
});

module.exports = router;

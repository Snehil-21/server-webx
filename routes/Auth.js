const express = require('express');
const cors = require('cors');
const router = express.Router();

const controller = require('../controllers/Auth');

router.use(express.json());
// router.use(cookieParser());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

const { signupUser, loginUser, signupAdmin, loginAdmin } = controller;

router.post('/signup', signupUser);
router.post('/login', loginUser);

router.post('/admin/signup', signupAdmin);
router.post('/admin/login', loginAdmin);

module.exports = router;
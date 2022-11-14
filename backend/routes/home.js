var express = require('express');
var router = express.Router();
const { homeData } = require('../controllers/home');

router.get("/", (req, res) => {
    res.json({ "data": "welcome to home page", "status": 200 });
});

router.get("/homeData", homeData);

module.exports = router;
var express = require('express');
const db = require("../model/helper");
var router = express.Router();

/* GET diaries page. */
router.get('/', function(req, res, next) {
    db("SELECT * FROM information")
    .then(result => {
        res.send(result.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
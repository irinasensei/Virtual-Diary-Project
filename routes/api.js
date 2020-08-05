var express = require('express');
const db = require("../model/helper");
var router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

/* GET diaries page. */
router.get('/Diary', function(req, res, next) {
    db("SELECT * FROM information")
    .then(results => {
        res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/Diary", (req, res) => {
    db(`insert into information (date, text) values ("${req.body.date}", ${req.body.text});`)
    .then(() => {
        db("SELECT * FROM information;").then(result => res.send(result.data));
      })
    .catch(err => res.status(500).send(err));
  });

module.exports = router;
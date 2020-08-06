var express = require('express');
const db = require("../model/helper");
var router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

/* GET diaries page. */
router.get("/", function(req, res, next) {
    db("SELECT * FROM information")
    .then(results => {
        res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});


/* GET date page. Search for one specific date */
router.get("/:date", function(req, res, next) {
    const { date } = req.params;
    if(date){
    db("SELECT * FROM information WHERE date >= '2020-01-01' AND date <= '2021-01-01'")
    // `SELECT * FROM information WHERE date = ${date}`
    .then(results => {
        res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}
});


/* POST a new diaries. */
router.post("/", (req, res) => {
    db(`insert into information (date, text) values (STR_TO_DATE("${req.body.date}", '%d/%m/%Y'), "${req.body.text}");`)
    .then(() => {
        db("SELECT * FROM information;").then(result => res.send(result.data));
      })
    .catch(err => res.status(500).send(err));
  });


/* DELETE one diaries page. */
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (id) {
      db(`delete from information where id = "${id}"`)
        .then(results => res.send("Item deleted"))
        .catch(err => res.status(500).send(err));
    }
  });
   
module.exports = router;
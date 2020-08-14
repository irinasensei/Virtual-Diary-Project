var express = require("express");
const db = require("../model/helper");
var router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

/* GET diaries page. */
router.get("/", function (req, res, next) {
  db("SELECT * FROM information;")
    .then((results) => {
      res.send(results.data);
      console.log(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

/* GET a specific page from diary */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  if (id) {
    db(`SELECT * from information where id = "${id}";`)
      .then((results) => {
        res.status(200).send(results.data);
      })
      .catch((err) => res.status(500).send(err));
  }
});

/* POST a new diaries. */
router.post("/", (req, res) => {
  // Julieta's code db(`insert into information (date, text) values (STR_TO_DATE("${req.body.date}", '%d/%m/%Y'), "${req.body.text}");`)
  //below Irina's after change to date input
  // 1st try db(insert into information (date,text) values ("${req.body.date}", "${req.body.text}");`)
  //2nd try
  db(
    `insert into information (date, text) values ("${req.body.date}","${req.body.text}");`
  )
    .then(() => {
      db("SELECT * FROM information;").then((result) => res.send(result.data));
    })
    .catch((err) => res.status(500).send(err));
});

/* DELETE one diaries page. */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    db(`delete from information where id = "${id}";`)
      .then(() => {
        db("SELECT * FROM information;")
          .then((results) => {
            res.status(200).send(results.data);
          })
          .catch((err) => res.status(500).send(err));
      })
      .catch((err) => res.status(500).send(err));
  }
});

module.exports = router;

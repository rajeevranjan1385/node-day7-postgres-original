const express = require("express");
const app = express();
const port = 8900;
const Pool = require("pg").Pool;
const bodyParser = require('body-parser');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "docker",
  port: 5432
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//get call
app.get("/user", (req, res) => {
  pool.query("Select * from employee", (err, result) => {
    if (err) throw err;
    // res.status(200).send(result); //this will give the complete record
    res.status(200).send(result.rows); //this will resturn only data (i.e. employee table data in json format)
  });
});

//post call
app.post("/addEmployee", (req, res) => {
  const { city, name, phone } = req.body;
  pool.query(
    "INSERT INTO eomployee(city, name, phone) VALUES($1, $2, $3)"[
      (city, name, phone)
    ],
    (err, result) => {
      if (err) throw err;
      res.status(200).send("Data inserted");
    }
  );
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`Server is running at port ${port} `);
});

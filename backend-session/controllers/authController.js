const connection = require("../db");

exports.register = (req, res) => {
  const { username, password } = req.body;
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  connection.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send("User registered");
  });
};

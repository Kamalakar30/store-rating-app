import db from "../config/db.js";

export const getUsers = (req, res) => {

  const sql =
    "SELECT id,name,email,address,role FROM users";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};

export const addUser = (req, res) => {

  const {
    name,
    email,
    address,
    password,
    role
  } = req.body;

  const sql =
    "INSERT INTO users(name,email,address,password,role) VALUES(?,?,?,?,?)";

  db.query(
    sql,
    [
      name,
      email,
      address,
      password,
      role
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "User Added Successfully"
      });

    }
  );

};
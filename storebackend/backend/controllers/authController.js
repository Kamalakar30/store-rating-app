import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {

    const { name, email, address, password } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users(name,email,address,password,role) VALUES(?,?,?,?,?)";

    db.query(
      sql,
      [name, email, address, hashedPassword, "USER"],
      (err) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message: "User Registered Successfully"
        });

      }
    );

  } catch (error) {

    res.status(500).json(error);

  }
};

export const login = (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=?";

  db.query(
    sql,
    [email],
    async (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User Not Found"
        });
      }

      const user = result[0];

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid Password"
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d"
        }
      );

      res.status(200).json({
        message: "Login Successful",
        token,
        role: user.role,
        email: user.email,
        userId: user.id
      });

    }
  );

};

export const changePassword = async (req, res) => {

  const {
    email,
    oldPassword,
    newPassword
  } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=?";

  db.query(
    sql,
    [email],
    async (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User Not Found"
        });
      }

      const user = result[0];

      const isMatch =
        await bcrypt.compare(
          oldPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Old Password Incorrect"
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      const updateSql =
        "UPDATE users SET password=? WHERE email=?";

      db.query(
        updateSql,
        [
          hashedPassword,
          email
        ],
        (err) => {

          if (err) {
            return res.status(500).json(err);
          }

          res.status(200).json({
            message:
              "Password Updated Successfully"
          });

        }
      );

    }
  );

};
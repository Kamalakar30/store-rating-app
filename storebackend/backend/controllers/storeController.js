import db from "../config/db.js";

export const addStore = (req, res) => {

  const { name, email, address, owner_id } = req.body;

  const sql =
    "INSERT INTO stores(name,email,address,owner_id) VALUES(?,?,?,?)";

  db.query(
    sql,
    [name, email, address, owner_id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

     res.status(201).json({
  message: "Store Added Successfully",
  storeId: result.insertId
});

    }
  );
};

export const getStores = (req, res) => {

  const sql = "SELECT * FROM stores";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};

export const getStoreUsers = (req, res) => {

  const { storeId } = req.params;

  const sql = `
    SELECT
      users.id,
      users.name,
      users.email,
      ratings.rating
    FROM ratings
    JOIN users
      ON ratings.user_id = users.id
    WHERE ratings.store_id = ?
  `;

  db.query(sql, [storeId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};
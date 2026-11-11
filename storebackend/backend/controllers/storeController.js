
import db from "../config/db.js";

export const addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  // Validate required fields
  if (!name?.trim() || !email?.trim() || !address?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name, email and address are required"
    });
  }

  // Convert empty or missing owner_id to SQL NULL
  const ownerId =
    owner_id === undefined || owner_id === null || owner_id === ""
      ? null
      : Number(owner_id);

  // Validate owner ID only when provided
  if (ownerId !== null && (!Number.isInteger(ownerId) || ownerId <= 0)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Owner ID"
    });
  }

  const sql = `
    INSERT INTO stores (name, email, address, owner_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name.trim(), email.trim(), address.trim(), ownerId],
    (err, result) => {
      if (err) {
        console.error("Add Store Error:", err);

        return res.status(500).json({
          success: false,
          message: "Failed to add store",
          error: err.code
        });
      }

      res.status(201).json({
        success: true,
        message: "Store Added Successfully",
        storeId: result.insertId
      });
    }
  );
};

export const getStores = (req, res) => {
  const sql = "SELECT * FROM stores ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Get Stores Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch stores"
      });
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
    JOIN users ON ratings.user_id = users.id
    WHERE ratings.store_id = ?
  `;

  db.query(sql, [storeId], (err, result) => {
    if (err) {
      console.error("Get Store Users Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch store users"
      });
    }

    res.status(200).json(result);
  });
};

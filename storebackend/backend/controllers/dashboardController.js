import db from "../config/db.js";

export const getDashboardStats = (req, res) => {

  db.query(
    `
    SELECT
      (SELECT COUNT(*) FROM users) AS totalUsers,
      (SELECT COUNT(*) FROM stores) AS totalStores,
      (SELECT COUNT(*) FROM ratings) AS totalRatings
    `,
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(result[0]);
    }
  );

};
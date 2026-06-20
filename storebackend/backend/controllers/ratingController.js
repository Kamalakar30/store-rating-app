import db from "../config/db.js";

export const addRating = (req, res) => {

  const { user_id, store_id, rating } = req.body;

  const checkSql =
    "SELECT * FROM ratings WHERE user_id=? AND store_id=?";

  db.query(
    checkSql,
    [user_id, store_id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length > 0) {

        const updateSql =
          "UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?";

        db.query(
          updateSql,
          [rating, user_id, store_id],
          (err) => {

            if (err) {
              return res.status(500).json(err);
            }

            res.status(200).json({
              message: "Rating Updated Successfully"
            });

          }
        );

      } else {

        const insertSql =
          "INSERT INTO ratings(user_id,store_id,rating) VALUES(?,?,?)";

        db.query(
          insertSql,
          [user_id, store_id, rating],
          (err) => {

            if (err) {
              return res.status(500).json(err);
            }

            res.status(201).json({
              message: "Rating Added Successfully"
            });

          }
        );

      }

    }
  );
};

export const getStoreRating = (req, res) => {

  const { storeId } = req.params;

  const sql = `
    SELECT
      AVG(rating) AS averageRating,
      COUNT(*) AS totalRatings
    FROM ratings
    WHERE store_id = ?
  `;

  db.query(sql, [storeId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result[0]);

  });

};
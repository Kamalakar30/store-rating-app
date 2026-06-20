import { useState } from "react";
import axios from "axios";

function RatingModal({ storeId, storeName }) {

  const [rating, setRating] = useState(0);

  const submitRating = async () => {

    try {

      const userId = 1;

      const res = await axios.post(
        "http://localhost:5000/api/ratings/add",
        {
          user_id: userId,
          store_id: storeId,
          rating: rating
        }
      );

      alert(res.data.message);

    } catch (error) {
      console.log(error);
      alert("Failed To Add Rating");
    }

  };

  return (
    <div className="card p-3 mt-3">

      <h5>Rate {storeName}</h5>

      <div className="mb-3">

        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: "30px",
              cursor: "pointer"
            }}
            onClick={() => setRating(star)}
          >
            {star <= rating ? "⭐" : "☆"}
          </span>
        ))}

      </div>

      <button
        className="btn btn-success"
        onClick={submitRating}
      >
        Submit Rating
      </button>

    </div>
  );
}

export default RatingModal;
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function OwnerDashboard() {

  const [ratingData, setRatingData] = useState({
    averageRating: 0,
    totalRatings: 0
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchRating();
    fetchUsers();
  }, []);

  const fetchRating = async () => {
  try {

    const storeId =
      localStorage.getItem("storeId") || 1;

    const res = await axios.get(
      `https://store-rating-app-lgts.onrender.com/api/ratings/store/${storeId}`
    );

    setRatingData(res.data);

  } catch (error) {

    console.log(error);

  }
};

  const fetchUsers = async () => {
  try {

    const storeId =
      localStorage.getItem("storeId") || 1;

    const res = await axios.get(
      `https://store-rating-app-lgts.onrender.com/api/stores/${storeId}/users`
    );

    setUsers(res.data);

  } catch (error) {

    console.log(error);

  }
};

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2>Store Owner Dashboard</h2>

        <div className="card p-4 mt-4">

          <h4>Store Name</h4>
<p>
  {localStorage.getItem("storeName") || "Store"}
</p>
          <h4>Average Rating</h4>

          <h2>
            {Number(
              ratingData.averageRating || 0
            ).toFixed(1)} ⭐
          </h2>

          <h4>Total Ratings</h4>

          <h3>
            {ratingData.totalRatings}
          </h3>

        </div>

        <div className="mt-5">

          <h3>Users Who Rated This Store</h3>

          <table className="table table-bordered mt-3">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.rating} ⭐</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default OwnerDashboard;
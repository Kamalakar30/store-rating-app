import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const res = await axios.get(
        "https://store-rating-app-lgts.onrender.com/api/dashboard/stats"
      );

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4">
          Admin Dashboard
        </h2>

        <div className="row">

          <div className="col-md-4">
            <div className="card p-4 shadow text-center">

              <h5>Total Users</h5>

              <h1 className="text-primary">
                {stats.totalUsers}
              </h1>

            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow text-center">

              <h5>Total Stores</h5>

              <h1 className="text-success">
                {stats.totalStores}
              </h1>

            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow text-center">

              <h5>Total Ratings</h5>

              <h1 className="text-danger">
                {stats.totalRatings}
              </h1>

            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;

import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

function AddStore() {
  const [store, setStore] = useState({
    name: "",
    email: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setStore({
      ...store,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!store.name.trim() || !store.email.trim() || !store.address.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://store-rating-app-lgts.onrender.com/api/stores/add",
        {
          name: store.name.trim(),
          email: store.email.trim(),
          address: store.address.trim(),
          owner_id: null
        }
      );

      localStorage.setItem("storeId", res.data.storeId);
      localStorage.setItem("storeName", store.name);

      alert(res.data.message || "Store added successfully");

      setStore({
        name: "",
        email: "",
        address: ""
      });
    } catch (err) {
      console.log(err.response?.data || err);
      alert(
        err.response?.data?.message || "Failed to add store. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="card p-4 shadow">
          <h2 className="mb-4">Add Store</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={store.name}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Store Name"
              required
            />

            <input
              type="email"
              name="email"
              value={store.email}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Store Email"
              required
            />

            <textarea
              name="address"
              value={store.address}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Store Address"
              required
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Adding Store..." : "Create Store"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddStore;

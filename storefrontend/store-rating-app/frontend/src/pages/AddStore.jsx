import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

function AddStore() {
  const [store, setStore] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: ""
  });

  const handleChange = (e) => {
    setStore({
      ...store,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://store-rating-app-lgts.onrender.com/api/stores/add",
        store
      );

      alert(res.data.message);

      setStore({
        name: "",
        email: "",
        address: "",
        owner_id: ""
      });

    } catch (err) {
      console.log(err);
      alert("Failed to Add Store");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card p-4 shadow">

          <h2 className="mb-4">
            Add Store
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              value={store.name}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Store Name"
            />

            <input
              type="email"
              name="email"
              value={store.email}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Store Email"
            />

            <textarea
              name="address"
              value={store.address}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Store Address"
            ></textarea>

            <input
              type="number"
              name="owner_id"
              value={store.owner_id}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Owner ID"
            />

            <button
              type="submit"
              className="btn btn-primary"
            >
              Create Store
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddStore;
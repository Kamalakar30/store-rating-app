import Navbar from "../components/Navbar";
import RatingModal from "../components/RatingModal";
import axios from "axios";
import { useEffect, useState } from "react";

function StoreList() {

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
  try {

    const res = await axios.get(
      "https://store-rating-app-lgts.onrender.com/api/stores"
    );

    console.log("Stores:", res.data);

    setStores(res.data);

  } catch (error) {

    console.log("Store Fetch Error:", error);

  }
};

  const filteredStores = stores
    .filter((store) =>
      store.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      store.address
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {

      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      }

      return b.name.localeCompare(a.name);

    });

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>Stores</h2>

        <div className="row mb-3">

          <div className="col-md-8">

            <input
              type="text"
              className="form-control"
              placeholder="Search Store Name or Address"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="col-md-4">

            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value)
              }
            >
              <option value="asc">
                Name A-Z
              </option>

              <option value="desc">
                Name Z-A
              </option>

            </select>

          </div>

        </div>

        <div className="row">

          {filteredStores.map((store) => (

            <div
              className="col-md-4 mb-3"
              key={store.id}
            >

              <div className="card p-3 shadow">

                <h4>{store.name}</h4>

                <p>
                  <b>Address:</b> {store.address}
                </p>

                <p>
                  <b>Email:</b> {store.email}
                </p>

                <p>
                  <b>Store ID:</b> {store.id}
                </p>

                <RatingModal
                  storeId={store.id}
                  storeName={store.name}
                />

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default StoreList;
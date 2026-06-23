import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function UserDetails() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

      const res = await axios.get(
        "https://store-rating-app-lgts.onrender.com/api/users"
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

      alert("Failed To Load Users");

    }
  };

  const filteredUsers = users
    .filter((user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      user.address
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      user.role
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

        <h2>User Details</h2>

        <div className="row mb-3">

          <div className="col-md-8">

            <input
              type="text"
              className="form-control"
              placeholder="Search Name, Email, Address, Role"
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

        <table className="table table-bordered table-striped">

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user.id}>

                <td>{user.id}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.address}</td>

                <td>{user.role}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default UserDetails;
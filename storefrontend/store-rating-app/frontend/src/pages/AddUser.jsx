import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

function AddUser() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/users/add",
        {
          name,
          email,
          address,
          password,
          role
        }
      );

      alert(res.data.message);

      setName("");
      setEmail("");
      setAddress("");
      setPassword("");
      setRole("USER");

    } catch (error) {
      console.log(error);
      alert("Failed To Add User");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>Add User</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <textarea
            className="form-control mb-3"
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          ></textarea>

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <select
            className="form-select mb-3"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="STORE_OWNER">
              STORE_OWNER
            </option>
          </select>

          <button
            type="submit"
            className="btn btn-success"
          >
            Create User
          </button>

        </form>

      </div>
    </>
  );
}

export default AddUser;
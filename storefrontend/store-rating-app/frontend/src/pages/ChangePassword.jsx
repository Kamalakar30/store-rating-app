import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

function ChangePassword() {

  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      newPassword !== confirmPassword
    ) {

      alert(
        "Passwords Do Not Match"
      );

      return;

    }

    try {

      const res = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          email,
          oldPassword,
          newPassword
        }
      );

      alert(
        res.data.message
      );

      setEmail("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed To Update Password"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>Change Password</h2>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(
                e.target.value
              )
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="btn btn-warning"
          >
            Update Password
          </button>

        </form>

      </div>
    </>
  );
}

export default ChangePassword;
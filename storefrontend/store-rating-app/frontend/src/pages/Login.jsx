import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  try {

    const res = await axios.post(
      "https://store-rating-app-lgts.onrender.com/api/auth/login",
      formData
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "role",
      res.data.role
    );

    if (res.data.role === "ADMIN") {

      navigate("/admin/dashboard");

    } else if (
      res.data.role === "STORE_OWNER"
    ) {

      navigate("/owner/dashboard");

    } else {

      navigate("/stores");

    }

  } catch (err) {

    console.log(err);

    alert(
      "Invalid Email Or Password"
    );

  }
};

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        <div className="col-md-6 left-panel d-flex justify-content-center align-items-center">
          <div>
            <h1 className="display-4 text-white fw-bold">
              Store Rating System
            </h1>

            <p className="text-white">
              Rate stores and manage reviews easily.
            </p>
          </div>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">

          <div className="card p-4 login-card">

            <h2 className="mb-4 text-center">
              Login
            </h2>

            <form onSubmit={handleLogin}>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Email"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Password"
              />

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

            <p className="text-center mt-3">
              Don't have an account?
              <Link to="/signup"> Signup</Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
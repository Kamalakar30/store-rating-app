import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, address, password } = formData;

    if (name.length < 20 || name.length > 60) {
      return alert(
        "Name must be between 20 and 60 characters"
      );
    }

    if (address.length > 400) {
      return alert(
        "Address cannot exceed 400 characters"
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return alert("Enter valid email");
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return alert(
        "Password must be 8-16 chars with 1 uppercase and 1 special character"
      );
    }

    try {

      const res = await axios.post(
        "https://store-rating-app-lgts.onrender.com/api/auth/signup",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        address: "",
        password: ""
      });

    } catch (err) {

      console.log(err);

      alert("Registration Failed");

    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card p-4">

            <h2 className="text-center mb-4">
              Create Account
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Full Name"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Email"
              />

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Address"
              ></textarea>

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
                className="btn btn-success w-100"
              >
                Register
              </button>

            </form>

            <p className="text-center mt-3">
              Already have account?
              <Link to="/"> Login</Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;
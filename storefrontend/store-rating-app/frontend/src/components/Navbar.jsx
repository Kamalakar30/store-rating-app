import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <div className="container">

        <Link className="navbar-brand" to="/">
          Store Rating
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/stores">
            Stores
          </Link>

          <Link className="nav-link" to="/admin/dashboard">
            Admin
          </Link>

          <Link className="nav-link" to="/admin/users/add">
            Add User
          </Link>

          <Link className="nav-link" to="/admin/stores/add">
            Add Store
          </Link>

          <Link className="nav-link" to="/owner/dashboard">
            Owner
          </Link>

          <Link className="nav-link" to="/user-details">
            Users
          </Link>

          <Link className="nav-link" to="/change-password">
            Password
          </Link>

          <button
            className="btn btn-danger ms-3"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
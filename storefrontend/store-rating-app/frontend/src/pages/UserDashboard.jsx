import Navbar from "../components/Navbar";

function UserDashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>Available Stores</h2>

        <div className="row">

          <div className="col-md-4">

            <div className="card p-3 mt-3">

              <h4>Reliance Mart</h4>

              <p>Hyderabad</p>

              <p>⭐⭐⭐⭐☆ (4.2)</p>

              <button className="btn btn-primary">
                Rate Store
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default UserDashboard;
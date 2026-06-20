import Navbar from "../components/Navbar";

function Stores() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>Stores</h2>

        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Reliance Mart</td>
              <td>store@gmail.com</td>
              <td>Hyderabad</td>
              <td>4.2</td>
            </tr>
          </tbody>

        </table>

      </div>
    </>
  );
}

export default Stores;
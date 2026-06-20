import Navbar from "../components/Navbar";
function Users() {
  return (
    <div className="container mt-4">
        <>
  <Navbar />

  <div className="container mt-4">
    ...
  </div>
</>

      <h2>Users</h2>

      <input
        className="form-control mb-3"
        placeholder="Search User"
      />

      <table className="table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>Kamalakar</td>
            <td>kamal@gmail.com</td>
            <td>Hyderabad</td>
            <td>USER</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default Users;
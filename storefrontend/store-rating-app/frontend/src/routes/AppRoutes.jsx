import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import StoreList from "../pages/StoreList";
import AdminDashboard from "../pages/AdminDashboard";
import OwnerDashboard from "../pages/OwnerDashboard";
import AddUser from "../pages/AddUser";
import AddStore from "../pages/AddStore";
import ChangePassword from "../pages/ChangePassword";
import UserDetails from "../pages/UserDetails";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/stores" element={<StoreList />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route path="/owner/dashboard" element={<OwnerDashboard />} />

      <Route path="/admin/users/add" element={<AddUser />} />

      <Route path="/admin/stores/add" element={<AddStore />} />

      <Route path="/add-store" element={<AddStore />} />

      <Route path="/change-password" element={<ChangePassword />} />

      <Route path="/user-details" element={<UserDetails />} />

    </Routes>
  );
}

export default AppRoutes;
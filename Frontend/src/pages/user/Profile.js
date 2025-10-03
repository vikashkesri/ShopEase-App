import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Load user details from auth context
  useEffect(() => {
    if (auth?.user) {
      setName(auth.user.name || "");
      setPhone(auth.user.phone || "");
      setAddress(auth.user.address || "");
    }
  }, [auth?.user]);

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "https://shopease-app-fvn8.onrender.com/api/v1/auth/update-profile", 
        { name, password, phone, address },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`, 
            "Content-Type": "application/json", 
          },
        }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      // Update auth state & localStorage with new user details
      const updatedUser = data.updatedUser || data.user;
      const newAuth = { ...auth, user: { ...auth.user, ...updatedUser } };
      setAuth(newAuth);
      localStorage.setItem("auth", JSON.stringify(newAuth));

      toast.success("Profile updated successfully");
      setPassword(""); // Clear password field
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout title="Your Profile">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control mb-3"
                  placeholder="Enter your name"
                  autoFocus
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control mb-3"
                  placeholder="Enter new password (optional)"
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control mb-3"
                  placeholder="Enter your phone"
                />
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control mb-3"
                  placeholder="Enter your address"
                  rows={3}
                />
                <button type="submit" className="btn btn-primary">
                  UPDATE PROFILE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

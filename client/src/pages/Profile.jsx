import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data); // 🔥 FIXED (no .user)
        } else {
          console.error(data.message);
        }

      } catch (error) {
        console.error(error);
      }
    }

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <Layout>
        <p className="text-white text-center mt-10">Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-white text-center mt-10">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>

        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user._id}</p>
      </div>
    </Layout>
  );
}

export default Profile;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Update the import

const AdminPage = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Update the hook
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://alu-connect-api.onrender.com/auth/user"); // Update the URL
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/auth/user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <button onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </button>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div>
          <h3>User List</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.name} - {user.email}
                <button onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboardKarnataka = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Fetch users count dynamically
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []); // Fetch users once when the component loads

  // Fetch users data from the backend
  useEffect(() => {
    if (activeTab === "registeredUsers") {
      axios
        .get("http://localhost:5000/api/users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [activeTab]);

  // Delete user function
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/api/users/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user._id !== id)); // Remove user from state
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-800 text-white py-4 px-6 text-lg font-bold">
        Laundry Management System
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-900 text-white p-6">
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                activeTab === "dashboard" ? "bg-gray-700" : ""
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("registeredUsers")}
              className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                activeTab === "registeredUsers" ? "bg-gray-700" : ""
              }`}
            >
              Registered Users
            </button>
            <button
              onClick={() => setActiveTab("laundryRequests")}
              className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                activeTab === "laundryRequests" ? "bg-gray-700" : ""
              }`}
            >
              Laundry Requests
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 p-6">
          {activeTab === "dashboard" && (
            <>
              <h1 className="text-2xl font-bold mb-6">Dashboard / Overview</h1>

              {/* Cards Section */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold">New Request</h2>
                  <button className="mt-4 underline">View Details</button>
                </div>
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold">Accept</h2>
                  <button className="mt-4 underline">View Details</button>
                </div>
                <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold">Finished</h2>
                  <button className="mt-4 underline">View Details</button>
                </div>
                <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold">
                    {users.length} Registered Users
                  </h2>
                  <button
                    onClick={() => setActiveTab("registeredUsers")}
                    className="mt-4 underline"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Laundry Prices Table */}
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-4">
                  Laundry Price (Per Unit)
                </h2>
                <table className="w-full bg-white rounded-lg shadow-md">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="text-left px-4 py-2">Category</th>
                      <th className="text-left px-4 py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-t px-4 py-2">
                        Top Wear Laundry Price
                      </td>
                      <td className="border-t px-4 py-2">14</td>
                    </tr>
                    <tr>
                      <td className="border-t px-4 py-2">
                        Bottom Wear Laundry Price
                      </td>
                      <td className="border-t px-4 py-2">22</td>
                    </tr>
                    <tr>
                      <td className="border-t px-4 py-2">
                        Woolen Cloth Laundry Price
                      </td>
                      <td className="border-t px-4 py-2">20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "registeredUsers" && (
            <>
              <h1 className="text-2xl font-bold mb-6">Registered Users</h1>
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-left px-4 py-2">Name</th>
                    <th className="text-left px-4 py-2">Email</th>
                    <th className="text-left px-4 py-2">Password</th>
                    <th className="text-left px-4 py-2">Branch</th>
                    <th className="text-left px-4 py-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="border-t px-4 py-2">{user.name}</td>
                      <td className="border-t px-4 py-2">{user.email}</td>
                      <td className="border-t px-4 py-2">{user.password}</td>
                      <td className="border-t px-4 py-2">{user.branch}</td>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardKarnataka;

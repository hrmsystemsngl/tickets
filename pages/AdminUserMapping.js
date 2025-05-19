import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserMapping = () => {
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('/api/users');
    setUsers(res.data);
    const mgrs = res.data.filter(user => user.role === 'Manager');
    setManagers(mgrs);
  };

  const handleUpdate = async (userId, role, managerId) => {
    await axios.put(`/api/users/${userId}`, { role, managerId });
    fetchUsers();
  };

  return (
    <div className="container mt-4">
      <h2>User Mapping</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Manager</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select value={user.role} onChange={(e) => handleUpdate(user._id, e.target.value, user.manager?._id)}>
                  <option value="Employee">Employee</option>
                  <option value="Agent">Agent</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td>
                <select
                  value={user.manager?._id || ''}
                  onChange={(e) => handleUpdate(user._id, user.role, e.target.value)}
                  disabled={user.role === 'Manager' || user.role === 'Admin'}
                >
                  <option value="">None</option>
                  {managers.map(m => (
                    <option key={m._id} value={m._id}>{m.name}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={() => handleUpdate(user._id, user.role, user.manager?._id)}>
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserMapping;

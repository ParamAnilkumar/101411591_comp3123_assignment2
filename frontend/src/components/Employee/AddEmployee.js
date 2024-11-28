import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8091/api/v1/emp/employee', formData);
      alert('Employee added successfully');
      navigate('/employee');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding employee');
    }
  };

  return (
    <div>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date_of_joining"
          value={formData.date_of_joining}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;

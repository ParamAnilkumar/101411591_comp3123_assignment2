import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Employee.css';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('department'); // Default search criteria
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8091/api/v1/emp/employee');
      setEmployees(res.data);
      setFilteredEmployees(res.data); // Initially display all employees
    } catch (err) {
      alert(err.response?.data?.message || 'Error fetching employees');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8091/api/v1/emp/employee/${id}`);
      alert('Employee deleted successfully');
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting employee');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    const filtered = employees.filter((emp) => {
      if (searchCriteria === 'id') {
        return emp._id.toLowerCase().includes(value);
      } else if (searchCriteria === 'department') {
        return emp.department.toLowerCase().includes(value);
      } else if (searchCriteria === 'position') {
        return emp.position.toLowerCase().includes(value);
      }
      return false;
    });

    setFilteredEmployees(filtered);
  };

  return (
    <div>
      <h2>Employee Management</h2>
      <button onClick={() => navigate('/employee/add')} className="add-button">
        Add Employee
      </button>

      <div className="search-container">
        <select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className="search-select"
        >
          <option value="department">Department</option>
          <option value="position">Position</option>
          <option value="id">ID</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchCriteria}`}
          value={searchValue}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <h3>Employee List</h3>
      <ul>
        {filteredEmployees.map((emp) => (
          <li key={emp._id}>
            {emp.first_name} {emp.last_name} - {emp.email}{' '}
            <button onClick={() => navigate(`/employee/${emp._id}`)}>Info</button>
            <button onClick={() => navigate(`/employee/edit/${emp._id}`)}>Edit</button>
            <button onClick={() => handleDelete(emp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employee;

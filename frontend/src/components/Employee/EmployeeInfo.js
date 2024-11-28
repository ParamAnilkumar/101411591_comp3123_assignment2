import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeInfo = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:8091/api/v1/emp/employee/${id}`);
      setEmployee(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error fetching employee details');
    }
  };

  return (
    <div>
      <h2>Employee Information</h2>
      {employee ? (
        <div>
          <p><strong>First Name:</strong> {employee.first_name}</p>
          <p><strong>Last Name:</strong> {employee.last_name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
          <p><strong>Date of Joining:</strong> {employee.date_of_joining}</p>
          <p><strong>Department:</strong> {employee.department}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeInfo;

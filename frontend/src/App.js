import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Employee from './components/Employee/Employee';
import EditEmployee from './components/Employee/EditEmployee';
import EmployeeInfo from './components/Employee/EmployeeInfo';
import AddEmployee from './components/Employee/AddEmployee';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/add" element={<AddEmployee/>} />
        <Route path="/employee/:id" element={<EmployeeInfo />} />
        <Route path="/employee/edit/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    address: '',
    category_id: '',
    image: null, // Initialize image as null
  }); 
  const [categories, setCategories] = useState([]);
  const [validSalary, setValidSalary] = useState(true); // State to manage salary validity
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://emsbackend-cdd9.onrender.com/auth/category') // Updated backend URL
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('category_id', employee.category_id);
    formData.append('image', employee.image);

    axios.post('https://emsbackend-cdd9.onrender.com/auth/add_employee', formData) // Updated backend URL
      .then((result) => {
        if (result.data.Status) {
          navigate('/dashboard/employee');
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSalaryChange = (e) => {
    const value = e.target.value;
    // Check if the entered value is a valid integer
    if (/^\d*$/.test(value)) {
      // Update the state only if the entered value is a valid integer
      setEmployee({ ...employee, salary: value });
      setValidSalary(true); // Reset validSalary state to true
    } else {
      setValidSalary(false); // Set validSalary state to false if the entered value is not a valid integer
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          {/* Form fields */}
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;

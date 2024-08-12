import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const employeesResult = await axios.get("https://emsbackend-cdd9.onrender.com/auth/employee");
        if (employeesResult.data.Status) {
          setEmployees(employeesResult.data.Result);
        } else {
          console.error(employeesResult.data.Error);
        }

        const categoriesResult = await axios.get("https://emsbackend-cdd9.onrender.com/auth/category");
        if (categoriesResult.data.Status) {
          setCategories(categoriesResult.data.Result);
        } else {
          console.error(categoriesResult.data.Error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    
    if (confirmDelete) {
      axios.delete(`https://emsbackend-cdd9.onrender.com/auth/delete_employee/${id}`)
        .then(result => {
          if (result.data.Status) {
            // Remove the deleted employee from the state without reloading the page
            setEmployees(employees.filter(employee => employee.id !== id));
            alert("Employee deleted successfully");
          } else {
            console.error(result.data.Error);
          }
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (id) => {
    const confirmEdit = window.confirm("Are you sure you want to edit this employee?");
    if (confirmEdit) {
      navigate(`/dashboard/edit_employee/${id}`);
    }
  };
  
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary (₹)</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>
                  <img
                    src={`https://emsbackend-cdd9.onrender.com/Images/${employee.image}`}
                    alt={employee.name}
                    className="employee_image"
                  />
                </td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>{employee.salary}</td>
                <td>{categories.find((cat) => cat.id === employee.category_id)?.name}</td>
                <td> 
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(employee.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;

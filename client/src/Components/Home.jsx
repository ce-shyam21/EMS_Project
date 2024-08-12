import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css'; // Import CSS file

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    adminCount();
    employeeCount();
    salaryCount();
    getAdminRecords();
  };

  const getAdminRecords = () => {
    axios.get('https://emsbackend-cdd9.onrender.com/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(error => console.log(error));
  };

  const adminCount = () => {
    axios.get('https://emsbackend-cdd9.onrender.com/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        }
      })
      .catch(error => console.log(error));
  };

  const employeeCount = () => {
    axios.get('https://emsbackend-cdd9.onrender.com/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      })
      .catch(error => console.log(error));
  };

  const salaryCount = () => {
    axios.get('https://emsbackend-cdd9.onrender.com/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='card custom-card w-25'>
          <div className='card-body'>
            <h4 className='card-title text-center'>Admin</h4>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{adminTotal}</h5>
            </div>
          </div>
        </div>

        <div className='card custom-card w-25'>
          <div className='card-body'>
            <h4 className='card-title text-center'>Employee</h4>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{employeeTotal}</h5>
            </div>
          </div>
        </div>

        <div className='card custom-card w-25'>
          <div className='card-body'>
            <h4 className='card-title text-center'>Salary</h4>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>₹ {salaryTotal}/-</h5>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map((admin, index) => (
                <tr key={index}>
                  <td>{admin.email}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

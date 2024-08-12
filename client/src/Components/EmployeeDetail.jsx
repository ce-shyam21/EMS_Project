import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState(null);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const employeeResult = await axios.get(`https://emsbackend-cdd9.onrender.com/employee/detail/${id}`);
                setEmployee(employeeResult.data[0]);

                const categoryResult = await axios.get("https://emsbackend-cdd9.onrender.com/auth/category");
                if (categoryResult.data.Status) {
                    setCategories(categoryResult.data.Result);
                } else {
                    console.error(categoryResult.data.Error);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchEmployeeData();
    }, [id]);

    const handleLogout = () => {
        axios.get('https://emsbackend-cdd9.onrender.com/employee/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid");
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    };

    if (!employee || categories.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="top-bar p-2 d-flex align-items-center shadow text-white bg-dark">
                <img src="/Images/logo.png" alt="Logo" width='250px' height='65px' className="logo" />
                <h4 className="text-center flex-grow-1 ms-2 me-auto">Employee Management System</h4>
            </div>

            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                <img src={`https://emsbackend-cdd9.onrender.com/Images/${employee.image}`} className='emp_det_image' alt={employee.name} />
                <div className='d-flex align-items-center flex-column mt-5'>
                    <table className="employee-table">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{employee.name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{employee.email}</td>
                            </tr>
                            <tr>
                                <th>Category</th>
                                <td>{categories.find(cat => cat.id === employee.category_id)?.name}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>{employee.address}</td>
                            </tr>
                            <tr>
                                <th>Salary</th>
                                <td>₹ {employee.salary}/-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <button className='btn btn-danger myclass' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </>
    );
};

export default EmployeeDetail;

import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [isChecked, setIsChecked] = useState(false); // State to manage checkbox
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isChecked) {
            setError("Please agree to terms and conditions.");
            return;
        }
        axios.post('https://emsbackend-cdd9.onrender.com/employee/employee_login', values)
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem("valid", true);
                    navigate('/employee_detail/' + result.data.id);
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-warning'>
                    {/* this is used to show login errors */}
                    {error && error}
                </div>
                <h2>Login Page(Employee)</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            type="email"
                            name='email'
                            autoComplete='off'
                            placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3 position-relative'> {/* Added position-relative class */}
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                placeholder='Enter Password'
                                value={values.password}
                                onChange={(e) => setValues({ ...values, password: e.target.value })}
                                className='form-control rounded-0'
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword ? (
                                    <i className="far fa-eye-slash"></i>
                                ) : (
                                    <i className="far fa-eye"></i>
                                )}
                            </button>
                        </div>
                    </div>
                    <button disabled={!isChecked} className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <div className='mb-1'>
                        <input
                            type="checkbox"
                            name="tick"
                            id="tick"
                            className='me-2'
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor="tick">You Agree with <a href="https://en.wikipedia.org/wiki/Terms_of_service">terms</a> & <a href="https://en.wikipedia.org/wiki/Terms_of_service">conditions</a> </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeLogin;

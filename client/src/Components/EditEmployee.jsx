import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    salary: '', 
    address: '',
    category_id: '',
    image: null, // Add image field to the state
  });
  const [category, setCategory] = useState([]);
  const [validSalary, setValidSalary] = useState(true); // State to manage salary validity
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://emsbackend-cdd9.onrender.com/auth/employee/${id}`)
      .then(result => {
        const fetchedEmployee = result.data.Result[0];
        setEmployee({
          ...fetchedEmployee,
          category_id: fetchedEmployee.category_id.toString(),
        })
      }).catch(err => console.error(err));

    axios.get('https://emsbackend-cdd9.onrender.com/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.error(err));

    const handleWindowClose = (e) => {
      e.preventDefault();
      const confirmationMessage = 'Changes you made may not be saved.';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('salary', employee.salary);
    formData.append('address', employee.address);
    formData.append('category_id', employee.category_id);
    formData.append('image', employee.image); // Include image in the form data

    axios.put(`https://emsbackend-cdd9.onrender.com/auth/edit_employee/${id}`, formData) // Send formData instead of employee object
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/employee');
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.error(err));
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

  const handleImageChange = (e) => {
    setEmployee({ ...employee, image: e.target.files[0] });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary (₹)
            </label>
            <input
              type="text"
              className={`form-control rounded-0 ${!validSalary ? 'is-invalid' : ''}`}
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={handleSalaryChange} // Call handleSalaryChange function on input change
            />
            {!validSalary && (
              <div className="invalid-feedback">Please enter a valid salary (integer only).</div>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={employee.address}
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={employee.category_id}
              onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
            >
              {category.map((c) => (
                <option key={c.id} value={c.id.toString()}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Add image input field */}
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select New Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={handleImageChange} // Call handleImageChange function on file input change
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;

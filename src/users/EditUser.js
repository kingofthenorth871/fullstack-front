import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    address: "",
    countrycode: "", 
    phonenumber: "",
    birthdate: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Check if any input field is blank
    if (!user.name || !user.address || !user.countrycode || !user.phonenumber || !user.birthdate) {
      alert("All input fields are required");
      return;
    }
    try {
      await axios.put(`http://localhost:8080/user/${id}`, user);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                id="name" 
                value={user.name}
                onChange={onInputChange}
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your address"
                name="address"
                id="address" 
                value={user.address}
                onChange={onInputChange}
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="countrycode" className="form-label">
                Country Code
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your country code"
                name="countrycode"
                id="countrycode" 
                value={user.countrycode}
                onChange={onInputChange}
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your phone number"
                name="phonenumber"
                id="phonenumber" 
                value={user.phonenumber}
                onChange={onInputChange}
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="birthdate" className="form-label">
                Birthdate
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter your birthdate"
                name="birthdate"
                id="birthdate" 
                value={user.birthdate}
                onChange={(e) => onInputChange(e)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

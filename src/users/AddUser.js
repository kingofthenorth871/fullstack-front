import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    address: "",
    countrycode: "47",
    phonenumber: "",
    birthdate: "",
  });

  const { name, address, phonenumber, countrycode, birthdate } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if any input field is blank
    if (!name || !address || !countrycode || !phonenumber || !birthdate) {
      alert("All input fields are required");
      return;
    }

    await axios.post("http://localhost:8080/user", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
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
                value={name}
                onChange={(e) => onInputChange(e)}
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
                value={address}
                onChange={(e) => onInputChange(e)}
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
              value={countrycode}
              defaultValue="47"
              onChange={(e) => onInputChange(e)}
              pattern="[0-9]*"
              maxLength={3} // Add maxLength attribute
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
                value={phonenumber}
                onChange={(e) => onInputChange(e)}
                pattern="[0-9]*"
                maxLength={9} // Add maxLength attribute
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
                value={birthdate}
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
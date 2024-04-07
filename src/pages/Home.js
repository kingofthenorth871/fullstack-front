import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { calculateCrossSum } from '../utils/crossSum';
import { LeapYearChecker, LeapYearCheckerBool } from '../utils/leapYearCalculation';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  };

  // Calculate the number of users
  const numberOfUsers = users.length;

  // Calculate the average length of names
  const totalNameLength = users.reduce((acc, user) => acc + user.name.replace(/\s/g, '').length, 0);
  const averageNameLength = numberOfUsers > 0 ? totalNameLength / numberOfUsers : 0;

  // Calculate the number of people born in a leap year
  const numberOfLeapYearPeople = users.filter(user => {
  const birthdate = new Date(user.birthdate);
  return LeapYearCheckerBool(birthdate);
}).length;

  return (
    <div className="container">
      <div className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">User List</h2>
          <div className="summary-box p-3">
            <p className="m-0">Number of Users: {numberOfUsers}</p>
            <p className="m-0">Number of People Born in a Leap Year: {numberOfLeapYearPeople}</p>
            <p className="m-0">Average Name Length: {averageNameLength.toFixed(2)}</p>
          </div>
        </div>

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Countrycode</th>
              <th scope="col">Phonenumber</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Name Backwards</th>
              <th scope="col">Final Cross Sum of Phonenumber</th>
              <th scope="col">Born in Leap Year</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.countrycode}</td>
                <td>{user.phonenumber}</td>
                <td>{user.birthdate}</td> 
                <td>{user.name.split(/\s+/).map(word => word.split('').reverse().join('')).join(' ')}</td>           
                <td>{calculateCrossSum(user.phonenumber)}</td>
                <td>{LeapYearChecker(new Date(user.birthdate))}</td>
                <td className="d-flex">
                  <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>
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
}
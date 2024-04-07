import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import { calculateCrossSum } from '../utils/crossSum';
import { LeapYearChecker} from '../utils/leapYearCalculation';

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    address: "",
    countrycode: "47",
    phonenumber: "",
    birthdate: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {user.name}
                </li>
                <li className="list-group-item">
                  <b>address:</b>
                  {user.address}
                </li>
                <li className="list-group-item">
                  <b>Countrycode:</b>
                  {user.countrycode}
                </li>
                <li className="list-group-item">
                  <b>phonenumber:</b>
                  {user.phonenumber}
                </li>
                <li className="list-group-item">
                  <b>birthdate:</b>
                  {user.birthdate}
                  <li className="list-group-item">
                  <b>Name Backwards:</b>
                  {user.name.split('').reverse().join('')}
                </li>
                <li className="list-group-item">
                  <b>Cross Sum of Phonenumber:</b>
                  {calculateCrossSum(user.phonenumber)}
                </li>     
                <li className="list-group-item">
                  <b>Born in Leap Year:</b>
                  {LeapYearChecker(new Date(user.birthdate))}
                </li>                  
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
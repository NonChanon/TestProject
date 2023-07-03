import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });
  const { firstname, lastname, email, password, role } = user;
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await axios.post("http://localhost:8080/api/v1/auth/register", user);
    navigate("/usermanagement");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Firstname</label>
              <input
                type={"text"}
                className="form-control"
                placeholder="firstname"
                name="firstname"
                value={firstname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Lastname</label>
              <input
                type={"text"}
                className="form-control"
                placeholder="lastname"
                name="lastname"
                value={lastname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input
                type={"text"}
                className="form-control"
                placeholder="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type={"password"}
                className="form-control"
                placeholder="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input
                type={"text"}
                className="form-control"
                placeholder="role"
                name="role"
                value={role}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link to="/usermanagement" className="btn btn-outline-danger mx-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

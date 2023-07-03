import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });

  const editUser = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const { firstname, lastname, email, role } = user;

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(`http://localhost:8080/api/v1/admin/users/${id}`);
    await axios.put(`http://localhost:8080/api/v1/admin/users/${id}`, editUser);
    console.log("aaaa");
    navigate("/usermanagement");
  };

  const loadUsers = async () => {
    const dataRes = await axios.post(
      `http://localhost:8080/api/v1/admin/users/${id}`
    );
    setUser(dataRes.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

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

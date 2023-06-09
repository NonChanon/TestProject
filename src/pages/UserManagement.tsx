import style from "./UserManagement.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import editIcon from "../img/edit.svg";
import deleteIcon from "../img/delete.svg";
import "../components/PopupButt.css";
import AddUser from "../users/AddUser";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const [roles, setRoles] = useState([]);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    role: {
      name: "",
    },
  });

  const [search, setSearch] = useState({
    username: "",
    role: {
      name: ""
    },
    enabled: ""
  });

  const editUser = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    username: user.username,
    role: user.role,
  };

  const loadRoles = async () => {
    const dataRes = await axios.post("http://localhost:8080/api/roles");
    setRoles(dataRes.data);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    loadRoles();
    localStorage.setItem("id", `${id}`);
  };

  const onSearch = async (e: React.MouseEvent, request: object) => {
    e.preventDefault();
    const dataRes = await axios.post(
      `http://localhost:8080/api/v1/admin/users/search`,
      request
    );
    setUsers(dataRes.data.content);
    console.log("search data is : ", dataRes.data);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    localStorage.removeItem("id");
  };
  const { firstname, lastname, email, username } = user;

  const handleRole = (e: { target: { name: any; value: any } }) => {
    setUser({
      ...user,
      role: {
        ...user.role,
        [e.target.name]: e.target.value,
      },
    });
    console.log(user);
  };

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = async () => {
    await axios.put(
      `http://localhost:8080/api/v1/admin/users/${localStorage.id}`,
      editUser
    );
    localStorage.removeItem("id");
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    console.log("loadUsers");
    const dataRes = await axios.post(
      "http://localhost:8080/api/v1/admin/users"
    );
    console.log(dataRes.data);
    setUsers(dataRes.data);
  };

  const loadUser = async (id: Number) => {
    const dataRes = await axios.post(
      `http://localhost:8080/api/v1/admin/users/${id}`
    );
    setUser(dataRes.data);
  };

  const deleteUser = async (id: Number) => {
    if (window.confirm("Confirm Delete?")) {
      await axios.delete(`http://localhost:8080/api/v1/admin/users/${id}`);
      loadUsers();
    }
  };

  const userRoleTable = users.map((data, i) => {
    return (
      <tbody>
        <td>{i + 1}</td>
        <td>{data.username}</td>
        <td>{data.role.name}</td>
        <td>{data.firstname}</td>
        <td>{data.lastname}</td>
        <td>{data.email}</td>
        <td>{data.enabled}</td>
        <td>
          <div className={style.manage}>
            <button
              className={style.editButton}
              onClick={(e) => {
                loadUser(data.id);
                toggleModal(e, data.id);
              }}
            >
              <img src={editIcon} alt="edit" />
            </button>
            <button
              className={style.deleteLayout}
              onClick={() => deleteUser(data.id)}
            >
              <img src={deleteIcon} alt="delete" />
            </button>
          </div>
        </td>
      </tbody>
    );
  });

  return (
    <div className={style.space2}>
      {isOpen && (
        <form className={style.registerPopup} onSubmit={handleSubmit}>
          <div className="bgFade">
            <div className="a">
              <div className="titleBlock">
                <p className="popupTitle">EDIT USER</p>
                <button onClick={(e) => closeModal(e)} className={style.exit}>
                  X
                </button>
              </div>
              <form className={`shadow ${style.UserForm}`}>
                <div className={style.header}>Group User</div>
                <div className={style.formDetail}>
                  <label className={style.formLabel}>Role</label>

                  <select
                    className={style.tab}
                    name="name"
                    onChange={handleRole}
                  >
                    <option value="" disabled selected hidden>
                      {user.role.name}
                    </option>
                    {roles.map((data, i) => {
                      return <option value={data.name}>{data.name}</option>;
                    })}
                  </select>
                </div>
              </form>
              <form className={`shadow ${style.UserForm}`}>
                <div className={style.header}>User Details</div>
                <div className={style.formDetail}>
                  <label className={style.formLabel}>Firstname</label>
                  <input
                    type={"text"}
                    className={style.tab}
                    placeholder="firstname"
                    name="firstname"
                    value={firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className={style.formDetail}>
                  <label className={style.formLabel}>Lastname</label>
                  <input
                    type={"text"}
                    className={style.tab}
                    placeholder="lastname"
                    name="lastname"
                    value={lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className={style.formDetail}>
                  <label className={style.formLabel}>E-mail</label>
                  <input
                    type={"email"}
                    className={style.tab}
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className={style.formDetail}>
                  <label className={style.formLabel}>Username</label>
                  <input
                    type={"text"}
                    className={style.tab}
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                </div>
                <div className={style.formDetail}>
                  <label className={style.formLabel}>Password</label>
                  <input
                    type={"password"}
                    className={style.tab}
                    placeholder="password"
                    name="password"
                  />
                </div>
              </form>
              <div className={style.buttonBox}>
                <button type="submit" className={style.submitButt}>
                  Submit
                </button>
                <button
                  className={style.cancelButt}
                  onClick={(e) => closeModal(e)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <div className={`${style.title} ${style.spaceTitle}`}>
        <div className={style.line}></div>
        <div>User Management</div>
      </div>
      <div className={`shadow ${style.searchFunctionContainer}`}>
        <div className={style.filterContainer}>
          <button className={`${style.button1}`}>
            <div className={`${style.row}`}>
              <input
                name="username"
                placeholder="username"
                className={style.inputForm}
                onChange={(e) => {
                  setSearch({...search, [e.target.name]: e.target.value});
                }}
              />
            </div>
            <div className={`${style.line2}`}></div>
          </button>
          <button className={`${style.button1}`}>
            <div className={`${style.row}`}>
              <select
                className={style.selectForm}
                name="selectedRole"
                onChange={(e) => {
                  setSearch({
                    ...search,
                    role: {
                      ...search.role,
                      ['name']: e.target.value
                    },
                  });
                }}
                >
                <option value="" disabled selected hidden>
                  Select Group User
                </option>
                <option value="all">All</option>
                {roles.map((data, i) => {
                  return <option value={data.name}>{data.name}</option>;
                })}
              </select>
            </div>
            <div className={`${style.line2}`}></div>
          </button>
          {/* <button className={`${style.button1}`}>
            <div className={`${style.row}`}>
              <select
                className={style.selectForm}
                name="enabled"
                onChange={(e) => {
                  setSearch({...search, [e.target.name]: e.target.value});
                }}
              >
                <option value="" disabled selected hidden color="#ffffff">
                  Select Status
                </option>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className={`${style.line2}`}></div>
          </button> */}
        </div>
        <div className={style.searchLayout}>
          <button
            className={style.searchButton}
            onClick={(e) => onSearch(e, search)}
          >
            <div className={style.row}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
              >
                <g
                  fill="none"
                  fill-rule="evenodd"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="8.5" cy="8.5" r="5" />
                  <path d="M17.571 17.5L12 12" />
                </g>
              </svg>
              <div className={style.spaceSearchButton}>Search</div>
            </div>
          </button>
        </div>
      </div>
      <div className={`${style.transactionTable}`}>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Group User</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          {userRoleTable}
        </table>
      </div>
      <div className={style.addContainer}>
        <AddUser />
      </div>
    </div>
  );
}

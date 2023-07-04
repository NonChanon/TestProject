import style from "./RoleManagement.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.token}`,
};

export default function RoleManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const dataRes = await axios.post("http://localhost:8080/api/v1/roles");
    console.log(dataRes.data);
    setUsers(dataRes.data);
  };

  const userRoleTable = users.map((data, i) => {
    return (
      <tbody>
        <td>{i + 1}</td>
        <td>{data.role}</td>
        <td>{data.createdDate}</td>
        <td>{data.createdUser}</td>
        <td>{data.updatedDate}</td>
        <td>{data.updatedUser}</td>
        <td>
          <label className={`${style[data.status]}`}>{data.status}</label>
        </td>
        <td>
          <button className={`${style.editButton} ${style.manageButtonLayout}`}>
            Edit
          </button>
          <button
            className={`${style.deleteButton} ${style.manageButtonLayout}`}
          >
            Delete
          </button>
        </td>
      </tbody>
    );
  });

  return (
    <>
      <div className={style.space2}>
        <div className={`${style.title} ${style.spaceTitle}`}>
          <div className={style.line}></div>
          <div>Role Management</div>
        </div>
        <div
          className={`shadow ${style.searchFunctionContainer} ${style.spaceTitle}`}
        >
          <div className={style.searchFunctionBox}>
            <div className="filterFunction">
              <button className={`${style.button1}`}>
                <div className={`${style.row}`}>
                  <select className={style.selectForm} name="selectedRole">
                    <option value="" disabled selected hidden>
                      Select Group User
                    </option>
                    <option value="all">All</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className={`${style.line2}`}></div>
              </button>
              <button className={`${style.button1}`}>
                <div className={`${style.row}`}>
                  <select className={style.selectForm} name="selectedRole">
                    <option value="" disabled selected hidden color="#ffffff">
                      Select Status
                    </option>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className={`${style.line2}`}></div>
              </button>
            </div>
            <button className={style.searchButton}>
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
        <div className={style.spaceTitle}>
          <button className={`${style.addButton} ${style.buttonLayout}`}>
            Add
          </button>
          <button className={`${style.deleteButton} ${style.buttonLayout}`}>
            Delete
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Group User</th>
              <th>Created User</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Updated User</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          {userRoleTable}
        </table>
      </div>
    </>
  );
}

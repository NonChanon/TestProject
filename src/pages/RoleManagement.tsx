import style from "./RoleManagement.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import editIcon from "../img/edit.svg";
import deleteIcon from "../img/delete.svg";
import AddRole from "../roles/AddRole";
axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.token}`,
};

interface roleModel {
  name: string;
  permissions: [
    {
      id: number;
    }
  ];
}

export default function RoleManagement() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    loadRoles();
  }, []);

  const [role, setRole] = useState<roleModel>({
    name: "",
    permissions: [
      {
        id: 0,
      },
    ],
  });

  const { name } = role;
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    loadRole(id);
    setIsOpen(!isOpen);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    localStorage.removeItem("id");
  };
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setRole({ ...role, [e.target.name]: e.target.value });
    console.log(role);
  };

  const handlePermission = (e: React.MouseEvent, arr: any) => {
    setRole({ ...role, ["permissions"]: arr });
    console.log(role);
  };

  const loadRoles = async () => {
    const dataRes = await axios.post("http://localhost:8080/api/roles");
    setRoles(dataRes.data);
  };

  const loadRole = async (id: Number) => {
    const dataRes = await axios.post(`http://localhost:8080/api/roles/${id}`);
    setRole(dataRes.data);
    console.log(role);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/roles`, role);
    setIsOpen(!isOpen);
    loadRoles();
  };

  const deleteRole = async (id: Number) => {
    if (window.confirm("Confirm Delete?")) {
      await axios.delete(`http://localhost:8080/api/roles/${id}`);
      loadRoles();
    }
  };

  let arr = role.permissions;
  const hasIdOne = arr.some((obj) => obj.id === 1);
  const hasIdTwo = arr.some((obj) => obj.id === 2);
  const hasIdThree = arr.some((obj) => obj.id === 3);
  const hasIdFour = arr.some((obj) => obj.id === 4);

  const roleTable = roles.map((data, i) => {
    return (
      <tbody>
        <td>{i + 1}</td>
        <td>{data.name}</td>
        <td>{data.createdDate}</td>
        <td>{data.createdUser}</td>
        <td>{data.updatedDate}</td>
        <td>{data.updatedUser}</td>
        <td>
          <label className={`${style[data.status]}`}>{data.status}</label>
        </td>
        <td className={style.manage}>
          <button
            className={style.editButton}
            onClick={(e) => toggleModal(e, data.id)}
          >
            <img src={editIcon} alt="edit" />
          </button>
          <button
            className={style.deleteLayout}
            onClick={() => deleteRole(data.id)}
          >
            <img src={deleteIcon} alt="delete" />
          </button>
        </td>
      </tbody>
    );
  });

  return (
    <>
      <div className={style.space2}>
        {isOpen && (
          <form
            className="registerPopup"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="bgFade">
              <div className="a">
                <div className="titleBlock">
                  <p className="popupTitle">Edit Role</p>
                  <button onClick={closeModal} className={style.exit}>
                    X
                  </button>
                </div>
                <form className={`shadow ${style.UserForm}`}>
                  <div className={style.header}>Role Details</div>
                  <div className={style.formDetail}>
                    <label className={style.formLabel}>Role Name</label>
                    <input
                      type={"text"}
                      className={style.tab}
                      placeholder="name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={style.formDetail}>
                    <label className={style.formLabel}>Permission</label>
                    <div className={style.formLabel}>
                      <label className={style.checkboxContainer}>
                        Create
                        <input
                          id="checkbox1"
                          type="checkbox"
                          name="id"
                          value="1"
                          checked={hasIdOne}
                          onClick={(e) => {
                            let thisBox = document.getElementById(
                              "checkbox1"
                            ) as HTMLInputElement;
                            console.log(thisBox);
                            let arr = role.permissions;
                            if (thisBox.checked) {
                              arr.push({ id: 1 });
                              console.log(arr);
                            } else {
                              var index = arr
                                .map((object) => object.id)
                                .indexOf(1);
                              console.log(index);
                              if (index !== -1) {
                                arr.splice(index, 1);
                              } else {
                                arr.pop();
                              }
                              console.log(arr);
                            }
                            handlePermission(e, arr);
                          }}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <label className={style.checkboxContainer}>
                        Read
                        <input
                          id="checkbox2"
                          type="checkbox"
                          name="id"
                          value="2"
                          checked={hasIdTwo}
                          onClick={(e) => {
                            let thisBox = document.getElementById(
                              "checkbox2"
                            ) as HTMLInputElement;
                            console.log(thisBox);
                            console.log(thisBox.checked);
                            let arr = role.permissions;
                            console.log(arr);
                            if (thisBox.checked) {
                              arr.push({ id: 2 });
                              console.log(arr);
                            } else {
                              var index = arr
                                .map((object) => object.id)
                                .indexOf(2);
                              if (index !== -1) {
                                arr.splice(index, 1);
                              } else {
                                arr.pop();
                              }
                              console.log(arr);
                            }
                            handlePermission(e, arr);
                          }}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <label className={style.checkboxContainer}>
                        Update
                        <input
                          id="checkbox3"
                          type="checkbox"
                          name="id"
                          value="3"
                          checked={hasIdThree}
                          onClick={(e) => {
                            let thisBox = document.getElementById(
                              "checkbox3"
                            ) as HTMLInputElement;
                            console.log(thisBox);
                            console.log(thisBox.checked);
                            let arr = role.permissions;
                            if (thisBox.checked) {
                              arr.push({ id: 3 });
                              console.log(arr);
                            } else {
                              var index = arr
                                .map((object) => object.id)
                                .indexOf(3);
                              console.log(index);
                              if (index !== -1) {
                                arr.splice(index, 1);
                              } else {
                                arr.pop();
                              }
                              console.log(arr);
                            }
                            handlePermission(e, arr);
                          }}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <label className={style.checkboxContainer}>
                        Delete
                        <input
                          id="checkbox4"
                          type="checkbox"
                          name="id"
                          value="4"
                          checked={hasIdFour}
                          onClick={(e) => {
                            let thisBox = document.getElementById(
                              "checkbox4"
                            ) as HTMLInputElement;
                            console.log(thisBox);
                            console.log(thisBox.checked);
                            let arr = role.permissions;
                            if (thisBox.checked) {
                              arr.push({ id: 4 });
                              console.log(arr);
                            } else {
                              var index = arr
                                .map((object) => object.id)
                                .indexOf(4);
                              console.log(index);
                              if (index !== -1) {
                                arr.splice(index, 1);
                              } else {
                                arr.pop();
                              }
                              console.log(arr);
                            }
                            handlePermission(e, arr);
                          }}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </form>
                <div className={style.buttonBox}>
                  <button type="submit" className={style.submitButt}>
                    Submit
                  </button>
                  <button className={style.cancelButt} onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
        <div className={`${style.title} ${style.spaceTitle}`}>
          <div className={style.line}></div>
          <div>Role Management</div>
        </div>
        <div className={`shadow ${style.searchFunctionContainer}`}>
          <div className={style.filterContainer}>
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
          <div className={style.searchLayout}>
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

        <div className={`${style.transactionTable}`}>
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
            {roleTable}
          </table>
        </div>
        <div className={style.addContainer}>
          <AddRole />
        </div>
      </div>
    </>
  );
}

import axios from "axios";
import { FormEvent, useState } from "react";
import style from "./AddRole.module.css";
import "../components/PopupButt.css";

interface roleModel {
  name: string;
  permissions: [
    {
      id: number;
    }
  ];
}

export default function AddRole() {
  const [role, setRole] = useState<roleModel>({
    name: "",
    permissions: [
      {
        id: 0,
      },
    ],
  });

  const { name } = role;

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setRole({ ...role, [e.target.name]: e.target.value });
    console.log(role);
  };

  const handlePermission = (e: React.MouseEvent, arr: any) => {
    setRole({ ...role, ["permissions"]: arr });
    console.log(role);
  };

  const handleSubmit = async (e: FormEvent) => {
    await axios.post("http://localhost:8080/api/roles/add", role);
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.container}>
      <div>
        <button className={style.addButton} onClick={toggleModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"
            />
          </svg>
          Add
        </button>

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
                  <p className="popupTitle">Add Role</p>
                  <button onClick={toggleModal} className={style.exit}>
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
                      <label className="container">
                        Create
                        <input
                          id="checkbox1"
                          type="checkbox"
                          name="id"
                          value="1"
                          onClick={(e) => {
                            let thisBox = document.getElementById(
                              "checkbox1"
                            ) as HTMLInputElement;
                            console.log(thisBox.checked);
                            let arr = role.permissions;
                            if (thisBox.checked) {
                              arr.push({ id: 1 });
                              console.log(arr);
                            } else {
                              var index =  arr.map(object => object.id).indexOf(1);
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
                      <label className="container">
                        Read
                        <input
                          id="checkbox2"
                          type="checkbox"
                          name="id"
                          value="2"
                          onClick={(e) => {
                            let thisBox = document.getElementById(
                              "checkbox2"
                            ) as HTMLInputElement;
                            console.log(thisBox.checked);
                            let arr = role.permissions;
                            console.log(arr);
                            if (thisBox.checked) {
                              arr.push({ id: 2 });
                              console.log(arr);
                            } else {
                              var index =  arr.map(object => object.id).indexOf(2);
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
                      <label className="container">
                        Update
                        <input
                          id="checkbox3"
                          type="checkbox"
                          name="id"
                          value="3"
                          onClick={(e) => {
                            let thisBox = document.getElementById(
                              "checkbox3"
                            ) as HTMLInputElement;
                            console.log(thisBox.checked);
                            let arr = role.permissions;
                            if (thisBox.checked) {
                              arr.push({ id: 3 });
                              console.log(arr);
                            } else {
                              var index =  arr.map(object => object.id).indexOf(3);
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
                      <label className="container">
                        Delete
                        <input
                          id="checkbox4"
                          type="checkbox"
                          name="id"
                          value="4"
                          onClick={(e) => {
                            let thisBox = document.getElementById(
                              "checkbox4"
                            ) as HTMLInputElement;
                            console.log(thisBox.checked);
                            let arr = role.permissions;
                            if (thisBox.checked) {
                              arr.push({ id: 4 });
                              console.log(arr);
                            } else {
                              var index =  arr.map(object => object.id).indexOf(4);
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
                  <button className={style.cancelButt} onClick={toggleModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

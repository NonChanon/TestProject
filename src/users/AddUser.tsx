import axios from "axios";
import { FormEvent, useState } from "react";
import style from "./AddUser.module.css";
import "../components/PopupButt.css";

export default function AddUser() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    role: {
      name: "",
    },
  });

  const { firstname, lastname, email, username, password } = user;

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const [roles, setRoles] = useState([]);

  const loadRoles = async () => {
    const dataRes = await axios.post("http://localhost:8080/api/roles");
    setRoles(dataRes.data);
  };
  const handleRole = (e: { target: { name: any; value: any } }) => {
    setUser({
      ...user,
      role: {
        ...user.role,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    // e.preventDefault();
    await axios.post("http://localhost:8080/api/v1/auth/register", user);
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    loadRoles();
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
            className={style.registerPopup}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="bgFade">
              <div className="a">
                <div className="titleBlock">
                  <p className="popupTitle">REGISTERATION</p>
                  <button onClick={toggleModal} className={style.exit}>
                    X
                  </button>
                </div>
                <form className={`shadow ${style.UserForm}`}>
                  <div className={style.header}>Group User</div>
                  <div className={style.formDetail}>
                    <label className={style.formLabel}>Role</label>
                    <select
                      required
                      className={style.tab}
                      name="name"
                      onChange={handleRole}
                    >
                      <option value="" disabled selected hidden>
                        Select Group User
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                      type={"password"}
                      className={style.tab}
                      placeholder="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                    />
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

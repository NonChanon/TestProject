import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../img/logo.png";
import UseAuth from "../services/UseAuth";
import { useState } from "react";

let activeClassName = "nav-active";

const adminPage = () => {
  for (let i = 1; i <= 4; i++) {
    if (
      localStorage.getItem(`permission${i}`) === "1" ||
      localStorage.getItem(`permission${i}`) === "3"
    ) {
      return (
        <div>
          <li>
            <NavLink
              to="/usermanagement"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              <svg
                className="menulistsvg"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h3.5m4.92.61a2.1 2.1 0 0 1 2.97 2.97L18 22h-3v-3l3.42-3.39z"
                />
              </svg>
              User Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rolemanagement"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              <svg
                className="menulistsvg"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h2.5m4.501 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0m2-3.5V17m0 4v1.5m3.031-5.25l-1.299.75m-3.463 2l-1.3.75m0-3.5l1.3.75m3.463 2l1.3.75"
                />
              </svg>
              Role Management
            </NavLink>
          </li>
        </div>
      );
    }
  }
};

export default function Navbar() {
  const { logout } = UseAuth();
  const { pathname } = useLocation();
  const [btnState, setBtnState] = useState(false);

  function handleClick() {
    setBtnState((btnState) => !btnState);
  }

  let toggleBtnCheck = btnState ? " active" : "";

  if (pathname == "/login" || pathname == "*") {
    return <div></div>;
  }

  return (
    <div className="container">
      <nav className="hnavbar">
        <div className="navObj">
          <div className="logoObj">
            <img className="logoimg" src={logo} alt="Logo" />
            <span>Eduty Stamp</span>
          </div>
          <button className={`btn${toggleBtnCheck}`} onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="48"
                d="M88 152h336M88 256h336M88 360h336"
              />
            </svg>
          </button>
          <div className="background" onClick={handleClick} />
          <nav className="vnavbar">
            <div className="menu">
              <span className="topic">
                MENU
                <button className="cancelNav" onClick={handleClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
                    />
                  </svg>
                </button>
              </span>
              <ul className="menulist">
                <li>
                  <NavLink
                    to={"/batchdataresult"}
                    className={({ isActive }) =>
                      isActive ? activeClassName : undefined
                    }
                  >
                    <svg
                      className="menulistsvg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        d="M24 15h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1m6 4h4m-2-4V3m0 12l4-4m-4 4l-4-4"
                      />
                    </svg>
                    Batch Data Result
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/rd"
                    className={({ isActive }) =>
                      isActive ? activeClassName : undefined
                    }
                  >
                    <svg
                      className="menulistsvg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="4"
                      >
                        <path d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z" />
                        <path d="m21 31l5 4l8-10M14 15h20m-20 8h8" />
                      </g>
                    </svg>
                    RD Transaction
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/invoice"
                    className={({ isActive }) =>
                      isActive ? activeClassName : undefined
                    }
                  >
                    <svg
                      className="menulistsvg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      >
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2zM9 7h1m-1 6h6m-2 4h2" />
                      </g>
                    </svg>
                    Invoice Payment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reciept"
                    className={({ isActive }) =>
                      isActive ? activeClassName : undefined
                    }
                  >
                    <svg
                      className="menulistsvg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-width="2"
                        fill="currentColor"
                        d="M13 19c0-.34.04-.67.09-1H4V8l8 5l8-5v5.09c.72.12 1.39.37 2 .72V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9.09c-.05-.33-.09-.66-.09-1m7-13l-8 5l-8-5h16m-2 10v2h4v2h-4v2l-3-3l3-3Z"
                      />
                    </svg>
                    Reciept & AS9
                  </NavLink>
                </li>

                {adminPage()}
              </ul>
            </div>
            <ul className="logout">
              <form>
                <li>
                  <NavLink
                    to="/login"
                    className="logoutBtn"
                    type="button"
                    onClick={logout}
                  >
                    <svg
                      className="menulistsvg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.8"
                      >
                        <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
                        <path d="M9 12h12l-3-3m0 6l3-3" />
                      </g>
                    </svg>
                    Log Out
                  </NavLink>
                </li>
              </form>
            </ul>
          </nav>
        </div>
      </nav>
    </div>
  );
}

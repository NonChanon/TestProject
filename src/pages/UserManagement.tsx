import "./UserManagement.css";
import testData from "./testData.tsx"

export default function UserManagement() {
  return (
    <>
      <div className="space2">
        <div className="title spaceTitle">
          <div className="line"></div>
          <div>User Management</div>
        </div>
        <div className="searchFunctionContainer spaceTitle">
          <div className="searchFunctionBox">
            <label>
              Username
              <br />
              <input type="username" id="username" name="username" />
            </label>
            <label>
              Group User
              <br />
              <select name="selectedRole" defaultValue="All">
                <option value="all">All</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label>
              Status
              <br />
              <select name="selectedStatus" defaultValue="All">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <button className="SearchButton">
              <div className="row ">
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
                <div className="spaceSearchButton">Search</div>
              </div>
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Group User</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Created Date</th>
              <th>Created User</th>
              <th>Updated Date</th>
              <th>Updated User</th>
              <th>First Login</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          {
            testData.map((data, i:number) => {
              return (
                <tbody>
                  <td>{i+1}</td>
                  <td>{data.username}</td>
                  <td>{data.role}</td>
                  <td>{data.firstname}</td>
                  <td>{data.lastname}</td>
                  <td>{data.email}</td>
                  <td>{data.createdDate}</td>
                  <td>{data.createdUser}</td>
                  <td>{data.updatedDate}</td>
                  <td>{data.updatedUser}</td>
                  <td>{data.firstLogin}</td>
                  <td>{data.lastLogin}</td>
                  <td>{data.status}</td>
                  <td>{data.manage}</td>
                </tbody>
              );
            })
          }
        </table>
      </div>
    </>
  );
}

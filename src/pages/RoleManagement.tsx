import style from  "./RoleManagement.module.css"
import testData from "./testData";

export default function RoleManagement() {
    return (
        <>
          <div className={style.space2}>
            <div className={`${style.title} ${style.spaceTitle}`}>
              <div className={style.line}></div>
              <div>Role Management</div>
            </div>
            <div className={`${style.searchFunctionContainer} ${style.spaceTitle}`}>
              <div className={`${style.searchFunctionBox}`}>
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
                <button className={`${style.searchButton}`}>
                  <div className={`${style.row}`}>
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
                    <div className={`${style.spaceSearchButton}`}>Search</div>
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
              {
                testData.map((data, i:number) => {
                  return (
                    <tbody>
                      <td>{i+1}</td>
                      <td>{data.role}</td>
                      <td>{data.createdDate}</td>
                      <td>{data.createdUser}</td>
                      <td>{data.updatedDate}</td>
                      <td>{data.updatedUser}</td>
                      <td>
                        <label className={`${style[data.status]}`}>{data.status}</label>
                      </td>
                      <td>
                        <button className={`${style.editButton} ${style.manageButtonLayout}`}>Edit</button>
                        <button className={`${style.deleteButton} ${style.manageButtonLayout}`}>Delete</button>
                      </td>
                    </tbody>
                  );
                })
              }
            </table>
          </div>
        </>
      );
}
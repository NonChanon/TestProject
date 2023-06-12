import "./UserManagement.css"

export default function UserManagement() {
    return (
        <div className="space2">
            <div className="title spaceTitle">
                <div className="line"></div>
                <div>User Management</div>
            </div>

            <div>
                <label htmlFor="">Username</label>
                <label htmlFor="">Group User</label>
                <label htmlFor="">Status</label>
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
                        <div className="space5">Search</div>
                    </div>
                </button>
            </div>
        </div>
    );
}
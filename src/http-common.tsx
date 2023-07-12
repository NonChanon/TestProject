import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
    },
});
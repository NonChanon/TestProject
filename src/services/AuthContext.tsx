import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
  isAuthen: false,
  isInitialize: false,
};

export const AuthContext = createContext<any>(initialState);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthen: true };
    case "LOGOUT":
      return { ...state, isAuthen: false };
    case "INITIALIZE":
      return { ...state, isInitialize: true };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.token;
    if (token) {
      dispatch({ type: "LOGIN" });
    }
    dispatch({ type: "INITIALIZE" });
  }, []);

  const login = async (form: any) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        form
      );
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
      dispatch({ type: "LOGIN" });
      console.log(localStorage.role);
      return { error: false };
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  };

  const logout = () => {
    try {
      axios.post("http://localhost:8080/api/v1/auth/logout");
      console.log(localStorage.token);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      dispatch({ type: "LOGOUT" });
      return { error: false };
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  };

  if (!state.isInitialize) return <div>loading...</div>;

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

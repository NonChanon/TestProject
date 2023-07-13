import style from "./Login.module.css";
import { useState, FormEvent } from "react";
import UseAuth from "../services/UseAuth";
import logo from "../img/logo.png";

const initState = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initState);
  const [error, setError] = useState(false);
  const { login } = UseAuth();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const temp: any = { ...form };
    temp[e.currentTarget.name] = e.currentTarget.value;
    setForm(temp);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const temp = { ...form };
      const res = await login(temp);
      setError(res.error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.loginPage}>
      <div className={style.form}>
        <img className={style.logoimg} src={logo} />
        <form className={style.loginForm} onSubmit={handleSubmit}>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button id="submit" type="submit">
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

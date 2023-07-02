import "./Login.css";
import { useState, FormEvent } from "react";
import UseAuth from "../services/UseAuth";

const initState = {
  email: "",
  password: ""
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

  const handleSubmit = async (event : FormEvent) => {
    event.preventDefault()
    try {
      const temp = { ...form };
      const res = await login(temp);
      setError(res.error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="text"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            required
            name="password"
            type="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
          />
          <button id="submit" type="submit">login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

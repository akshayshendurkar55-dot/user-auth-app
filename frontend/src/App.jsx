import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [result, setResult] = useState("");

  const [registerData, setRegisterData] = useState({
    full_name: "",
    email: "",
    mobile: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!registerData.full_name || !registerData.email || !registerData.mobile) {
      setResult("Please fill all fields.");
      return;
    }

    if (registerData.mobile.length !== 10) {
      setResult("Mobile number must be 10 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(
          `Registration Successful! User ID: ${registerData.mobile} Password: ${data.password || "Generated"}`
        );
      } else {
        setResult(data.message || "Registration failed.");
      }
    } catch (error) {
      setResult("Server error. Please try again.");
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password) {
      setResult("Please enter User ID and Password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`Login Successful! Welcome ${data.user.full_name}`);
      } else {
        setResult("Invalid User ID or Password.");
      }
    } catch (error) {
      setResult("Server error. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>User Registration & Login System</h1>

      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => { setPage("register"); setResult(""); }}>
          Register
        </button>

        <button className="nav-btn" onClick={() => { setPage("login"); setResult(""); }}>
          Login
        </button>
      </div>

      {page === "home" && (
        <div className="info-box">
          <h2>Select Register or Login</h2>
          <p>Create a new account or login with your existing credentials.</p>
        </div>
      )}

      {page === "register" && (
        <form className="form-box" onSubmit={registerUser}>
          <h2>Register</h2>

          <input
            name="full_name"
            placeholder="Full Name"
            value={registerData.full_name}
            onChange={handleRegisterChange}
          />

          <input
            name="email"
            placeholder="Email Address"
            value={registerData.email}
            onChange={handleRegisterChange}
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            value={registerData.mobile}
            onChange={handleRegisterChange}
          />

          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      )}

      {page === "login" && (
        <form className="form-box" onSubmit={loginUser}>
          <h2>Login</h2>

          <input
            name="username"
            placeholder="User ID / Mobile Number"
            value={loginData.username}
            onChange={handleLoginChange}
          />

          <input
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
          />

          <button className="submit-btn" type="submit">
            Login
          </button>
        </form>
      )}

      {result && <div className="success-box">{result}</div>}
    </div>
  );
}

export default App;
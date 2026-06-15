import { useState } from "react";

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

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();

    if (response.ok) {
      setResult(`Registered Successfully! Username ID: ${data.user.id}, Password: ${data.user.mobile}`);
    } else {
      setResult("Registration failed");
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (response.ok) {
      setResult(`Login Successful! Name: ${data.user.full_name}, Email: ${data.user.email}`);
    } else {
      setResult("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <h1>User Registration & Login System</h1>

      <button onClick={() => { setPage("register"); setResult(""); }}>
        Register
      </button>

      <button onClick={() => { setPage("login"); setResult(""); }}>
        Login
      </button>

      {page === "home" && <h2>Select Register or Login</h2>}
      <p>Create a new account or login with your existing credentials</p>

      {page === "register" && (
        <form onSubmit={registerUser}>
          <h2>Register</h2>

          <input name="full_name" placeholder="Full Name" onChange={handleRegisterChange} />
          <br /><br />

          <input name="email" placeholder="Email Address" onChange={handleRegisterChange} />
          <br /><br />

          <input name="mobile" placeholder="Mobile Number" onChange={handleRegisterChange} />
          <br /><br />

          <button type="submit">Submit</button>
        </form>
      )}

      {page === "login" && (
        <form onSubmit={loginUser}>
          <h2>Login</h2>

          <input name="username" placeholder="Username ID" onChange={handleLoginChange} />
          <br /><br />

          <input name="password" placeholder="Password / Mobile Number" onChange={handleLoginChange} />
          <br /><br />

          <button type="submit">Login</button>
        </form>
      )}

      {result && (
  <div className="success-box">
    {result}
  </div>
)}
    </div>
  );
}

export default App;
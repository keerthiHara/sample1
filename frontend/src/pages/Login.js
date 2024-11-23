import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:5000/api/auth/login", { email, password });
      const { token, role,userdetail } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("usersetail", JSON.stringify(userdetail)); // Store user details
      setUserRole(role);
      navigate("/home");
      console.log("sucess")
    } catch (err) {
      setError(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


// import React, { useState } from "react";
// import Axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = ({ setUserRole }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await Axios.post("http://localhost:5000/api/auth/login", { email, password });
//       const { token, role, userdetail,email } = response.data;
//       localStorage.setItem("token", token);
//       localStorage.setItem("email", email);
//       localStorage.setItem("userdetail", JSON.stringify(userdetail)); // Store user details
//       setUserRole(role);
//       navigate("/home");
//     } catch (err) {
//       setError(err.response?.data?.message || "Error logging in");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;

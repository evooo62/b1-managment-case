import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";


export default function Login() {

  
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  // const { token, setToken } = useToken();
  let navigate = useNavigate();

  async function loginUser(credentials) {
    let response = await fetch("https://icibot.net/p_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token_val}`
      },
      body: JSON.stringify(credentials),
    });

    let data = await response.json();

    console.log("data", data);

    if (data.code == 401) {
      alert(data.message);
    } else {
      // setToken(data.token_val);
      localStorage.setItem("access_token", data.token_val);
      navigate("/guestdetails");
    }
  }

  // console.log('token123123evren', token)
  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser({
      username,
      password,
      hotel_id: 3,
    });
  };

  return (
    <div className="loginBody">
      <div className="app">
        <div className="login-form">
          <form onSubmit={handleSubmit} className="frm">
            <div className="title">Relax Resort</div>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="btn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

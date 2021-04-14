import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectUser, setUser, User } from "../store/userSlice";

const Login: React.FC<{}> = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  let history = useHistory();

  const handlesLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMessage("");
    let response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      let message = "Password or Username incorrect. Please try again.";
      if (data.error) {
        message = data.error;
      }
      setErrMessage(message);
      return;
    }

    dispatch(setUser(data.user as User));
  };
  return (
    <div>
      {user?.email}
      <form onSubmit={handlesLogin}>
        <p>{errMessage}</p>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
};

export default Login;

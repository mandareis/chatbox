import React, { useState } from "react";

const Login: React.FC<{}> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlesLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <form onSubmit={handlesLogin}>
        <input
          type="text"
          placeholder="Username or Email"
          name="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="Name"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
};

export default Login;

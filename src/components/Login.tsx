import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectUser, setUser, User } from "../store/userSlice";
import { connect } from "react-redux";

const Login: React.FC<{}> = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const history = useHistory();

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
    if (!response.ok) {
      let message = "Password or Username incorrect. Please try again.";
      if (data.error) {
        message = data.error;
      }
      setErrMessage(message);
      return;
    }
    if (data.user) {
      dispatch(setUser(data.user as User));
      history.push("/");
    }
    console.log(`Hello, ${data.user.name}`);
  };
  return (
    <div className="flow-root flex justify-center">
      {user?.email}
      <form onSubmit={handlesLogin}>
        <p>{errMessage}</p>
        <div className="my-3">
          <input
            type="text"
            placeholder="Email"
            className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder-gray-600 focus:placeholder-gray-400 px-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-3">
          <input
            type="password"
            placeholder="Password"
            className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder-gray-600 focus:placeholder-gray-400 px-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="">
            <button
              type="submit"
              className="my-2 border-2 border-purple-500 hover:border-gray-500  ring-opacity-50 rounded-md text-sm w-12 py-1 focus:outline-none rounded-md"
            >
              Go
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect()(Login);

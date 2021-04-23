import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const RegisterFormInput: React.FC<{
  icon: string;
  value: any;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}> = (props) => {
  return (
    <div className="register-form">
      <div className="input-prefix-icon">
        <i className={`fas ${props.icon}`}></i>
      </div>
      <div>
        <input
          value={props.value}
          type={props.type}
          className="border my-2 border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder-gray-600 focus:placeholder-gray-400 px-2 rounded-md"
          onChange={props.onChange}
          autoComplete="off"
          placeholder={props.placeholder}
          required
        />
      </div>
    </div>
  );
};
const Register: React.FC<{}> = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handlesRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({}),
    });
  };

  return (
    <form onSubmit={handlesRegister}>
      {/* <p style={{ color: "red" }}>{registerErr}</p> */}
      <div className="pb-2">
        <span className="text-xl font-bold">Create an account</span>
      </div>

      <RegisterFormInput
        type="text"
        icon="fa-user"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <RegisterFormInput
        type="text"
        icon="fa-at"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <RegisterFormInput
        type="password"
        icon="fa-lock"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <RegisterFormInput
        type="password"
        icon="fa-lock"
        placeholder="Confirm Password"
        value={password_confirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button
        type="submit"
        className="my-2 border-2 border-purple-500 hover:border-gray-500  ring-opacity-50 rounded-md text-sm w-12 py-1 focus:outline-none rounded-md"
      >
        Go
      </button>
      <h5>
        Already have an account?
        <NavLink to="/login" className="font-bold">
          &nbsp;Login
        </NavLink>
      </h5>
    </form>
  );
};
export default connect()(Register);

import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

const RegisterFormInput = (props: any) => {
  return (
    <div className="register-form">
      <div className="input-prefix-icon">
        <i className={`fas ${props.icon}`}></i>
      </div>
      <div>
        <input
          value={props.value}
          type={props.type}
          onChange={props.onChange}
          autoComplete="off"
          placeholder={props.placeholder}
          required={props.required}
        />
      </div>
    </div>
  );
};
const handlesRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};
const Register: React.FC<{}> = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  return (
    <form className="register-input-container" onSubmit={handlesRegister}>
      {/* <p style={{ color: "red" }}>{registerErr}</p> */}
      <h2>Create an account</h2>
      <RegisterFormInput
        type="text"
        icon="fa-user"
        placeholder="Name"
        value={name}
        name="name"
        // onChange={(e ) => setName(e.target.value)}
        required="required"
      />
      <RegisterFormInput
        type="text"
        icon="fa-user"
        placeholder="Username"
        name="username"
        value={username}
        // onChange={(e) => setUsername(e.target.value)}
        required="required"
      />
      <RegisterFormInput
        type="text"
        icon="fa-at"
        placeholder="Email"
        name="email"
        value={email}
        // onChange={(e: any) => setEmail(e.target.value)}
        required="required"
      />
      <RegisterFormInput
        type="password"
        icon="fa-lock"
        placeholder="Password"
        name="password"
        value={password}
        // onChange={(e) => setPassword(e.target.value)}
        required="required"
      />
      <RegisterFormInput
        type="password"
        icon="fa-lock"
        name="password_confirmation"
        placeholder="Confirm Password"
        value={password_confirmation}
        // onChange={(e) => setPasswordConfirmation(e.target.value)}
        required="required"
      />
      <h5>
        Already have an account?
        <NavLink to="/login"> Login</NavLink>
      </h5>
    </form>
  );
};
export default Register;

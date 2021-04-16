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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const handlesRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="register-input-container" onSubmit={handlesRegister}>
      {/* <p style={{ color: "red" }}>{registerErr}</p> */}
      <h2>Create an account</h2>
      <RegisterFormInput
        type="text"
        icon="fa-user"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <RegisterFormInput
        type="text"
        icon="fa-user"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
      <h5>
        Already have an account?
        <NavLink to="/login"> Login</NavLink>
      </h5>
    </form>
  );
};
export default connect()(Register);

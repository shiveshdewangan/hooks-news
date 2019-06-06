import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const [login, setLogin] = useState(true);
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);

  const authenticateUser = async () => {
    const { name, email, password } = values;
    const response = login
      ? await firebase.login(email, password)
      : await firebase.register(name, email, password);
    console.log("response", response);
  };

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Creat Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            type="text"
            placeholder="Your name"
            autoComplete="off"
          />
        )}
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && "error-input"}
          type="email"
          placeholder="Your email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && "error-input"}
          type="password"
          placeholder="Choose a secure password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="button pointer"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? "need to create an account" : "already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

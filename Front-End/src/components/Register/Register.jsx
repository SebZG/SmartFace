import "./Register.css";

import { useState } from "react";

const Register = ({ loadUser, onRouteChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onNameChange(e) {
    setName(e.target.value);
    setError("");
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
    setError("");
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
    setError("");
  }

  async function onSubmitRegister(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const user = await res.json();

      if (!res.ok || !user.id) {
        setError("Unable to create account. Please check your details and try again.");
        return;
      }

      loadUser(user);
      onRouteChange("home");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Unable to register. Please try again.");
    }
  }

  return (
    <article
      id="register-form"
      className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
    >
      <main className="pa4 black-80">
        <form className="measure" onSubmit={onSubmitRegister}>
          <fieldset id="register" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            {error && (
              <p className="red" role="alert">
                {error}
              </p>
            )}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
                required
              />
            </div>

            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
                required
              />
            </div>

            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
                required
              />
            </div>
          </fieldset>

          <div>
            <button
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
            >
              Register
            </button>
          </div>

          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("signin")}
              className="f6 link dim black db pointer"
            >
              Sign In
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register;

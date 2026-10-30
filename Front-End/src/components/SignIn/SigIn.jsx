import "./SignIn.css";

import { useState } from "react";

const SignIn = ({ loadUser, onRouteChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onEmailChange(e) {
    setEmail(e.target.value);
    setError("");
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
    setError("");
  }

  async function onSubmitSignIn(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const user = await res.json();

      if (!res.ok || !user.id) {
        setError("Incorrect email or password.");
        return;
      }

      loadUser(user);
      onRouteChange("home");
    } catch (err) {
      console.error("Sign-in failed:", err);
      setError("Unable to sign in. Please try again.");
    }
  }

  return (
    <article
      id="signin-form"
      className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
    >
      <main className="pa4 black-80">
        <form className="measure" onSubmit={onSubmitSignIn}>
          <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            {error && (
              <p className="red" role="alert">
                {error}
              </p>
            )}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                id="email-address"
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                onChange={onEmailChange}
                required
              />
            </div>

            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
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
              Sign in
            </button>
          </div>

          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;

import { useContext, useState } from "react";
import { Redirect } from "react-router";
import { SignupBox, SignupSection } from "../../components/auth/SignUp";
import { UserContext } from "../../contexts/UserContext";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useContext(UserContext);
  document.title = "Forgot Password | DevBuilder";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await (
        await fetch(`/api/auth/forgot-password`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
      ).json();

      if (response.status) setError(response.message);
      else {
        setEmail("");
        setSuccess(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return !user ? (
    <SignupSection>
      <SignupBox>
        <h1>Forgot Password</h1>
        {error && <div style={{ color: "#c0392b" }}>Error: {error}</div>}
        {success ? (
          <div style={{ color: "#27ae60", textAlign: "center" }}>
            Check your email for the reset link
          </div>
        ) : (
          <form onSubmit={handleSubmit} method="POST">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button disabled={!email}>Send Password Reset Link</button>
          </form>
        )}
      </SignupBox>
    </SignupSection>
  ) : (
    <Redirect to="/" />
  );
}

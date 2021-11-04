import { useState } from "react";
import { SignupBox, SignupSection } from "../../components/auth/SignUp";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await (
        await fetch(`/auth/forgot-password`, {
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
        setSuccess(true);
        setEmail("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SignupSection>
      <SignupBox>
        <h1>Forgot Password</h1>
        {error && <div style={{ color: "#c0392b" }}>Error: {error}</div>}
        {success && (
          <div style={{ color: "#27ae60" }}>
            Check your email for the reset link
          </div>
        )}
        <form onSubmit={handleSubmit} method="POST">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button disabled={!email}>Send Password Reset Link</button>
        </form>
      </SignupBox>
    </SignupSection>
  );
}

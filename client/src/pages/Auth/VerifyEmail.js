import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Redirect } from "react-router-dom";

export function VerifyEmail({ location }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, token } = useContext(UserContext);
  const search = location.search;
  const emailVerificationKey = new URLSearchParams(search).get(
    "emailVerificationKey"
  );
  document.title = "Verify Email | DevBuilder";

  useEffect(() => {
    async function verifyEmail() {
      try {
        let response = await (
          await fetch(`/api/auth/verify-email`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emailVerificationKey }),
          })
        ).json();

        if (response.status) setError(response.message);
        else {
          if (token.refreshToken)
            localStorage.setItem("accessToken", response.accessToken);
          setSuccess(response.message);
        }
      } catch (error) {}
    }
    if (emailVerificationKey) {
      verifyEmail();
    }
  }, [emailVerificationKey]);

  return !emailVerificationKey ? (
    <>
      {user && user.status === 0 ? (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h1>Thanks for signing up</h1>
          <p>A verification email is sent to the email address you provided</p>
          <p>Please verify your email to continue using the site.</p>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  ) : (
    <>
      {user && user.status !== 0 ? (
        <Redirect to="/" />
      ) : (
        <div style={{ textAlign: "center" }}>
          {error && (
            <h3 style={{ color: "#c0392b" }}>
              Email Verification Error: {error}
            </h3>
          )}
          {success && (
            <>
              <h2 style={{ color: "#27ae60" }}>
                Email Verification Successful
              </h2>
              <a href="/" style={{ color: "#3498db" }}>
                Continue
              </a>
            </>
          )}
        </div>
      )}
    </>
  );
}

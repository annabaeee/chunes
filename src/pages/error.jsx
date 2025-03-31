import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useApi } from "../hooks/useApi.jsx";
import { LoginButton } from "../components/loginButton.jsx";

export const ErrorPage = () => {
  const location = useLocation();
  const [error] = useState(location.state?.error);
  const navigate = useNavigate();
  const api = useApi();

  // If there is no error, navigate to login or home
  useEffect(() => {
    if (!error) {
      navigate(api.user ? '/' : '/login', { replace: true });
    }
  }, [error]);

  const needsRegistration = error && error.source === 'spotify' && error.status === 403;
  return (
    <div>
      <h3>
        Error {error.status} {error.statusText}, Source: {error.source ?? "unknown"}
      </h3>
      {needsRegistration && 
      <h2>
        App is in <a href="https://developer.spotify.com/documentation/web-api/concepts/quota-modes">development mode</a>.
        Please contact the author to add your Spotify registered email address to the allow list.
      </h2>}
      {!api.user && <LoginButton value="Login with Spotify" />}
      <pre style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>
        {"Details: \n" + JSON.stringify(error, null, 2)}
      </pre>
    </div>
  );

};
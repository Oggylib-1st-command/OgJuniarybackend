import { GoogleOAuthProvider } from "@react-oauth/google";

import "./auth.scss";
import { CLIENTID } from "./Contact";

import Login from "./../../components/Login/login";

function Auth() {
  return (
    <div className="auth__inner">
      <GoogleOAuthProvider clientId={CLIENTID}>
        <Login />
      </GoogleOAuthProvider>
    </div>
  );
}

export default Auth;

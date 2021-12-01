import * as React from "react";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";

export default function LoginGoogle({ LoginGoogleSuccess }) {
  const [error, setError] = useState("");
  const responseGoogle = (response) => {
    if (!response.error) {
      fetchData(response);
    }
    return;
  };
  const fetchData = async ({ profileObj, tokenObj }) => {
    await fetch(process.env.REACT_APP_API + "/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: tokenObj.access_token,
        profile: profileObj,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          setError(res.status);
        }
        res.json().then((result) => {
          if (result) {
            localStorage.setItem("token", JSON.stringify(result.token));
            localStorage.setItem("expAt", JSON.stringify(result.expAt));
            LoginGoogleSuccess();
          }
        });
      })
      .catch((err) => console.error(err));
  };
  return (
    <GoogleLogin
      clientId={
        "959295540823-84njq0si2t07n4631pc5odd5q1bfjk2u.apps.googleusercontent.com"
      }
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    ></GoogleLogin>
  );
}

import * as React from "react";
import { GoogleLogin } from "react-google-login";

export default function LoginGoogle() {
    
  const responseGoogle = (response) => {
    const timer = new Date().getTime();
    console.log(timer);
    console.log(response);
    if (!response.error) {
        fetchData(response);
    }
    return;
  };
  const fetchData = async ({ profileObj, tokenObj }) => {
    localStorage.setItem("token", JSON.stringify(tokenObj.access_token));
    localStorage.setItem("expAt", JSON.stringify(tokenObj.expires_at));
    await fetch("http://localhost:3001/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile: profileObj,
      }),
    })
      .then(async (res) => {
        res.json().then((result) => {
          if (result) {
            alert(result.message);
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

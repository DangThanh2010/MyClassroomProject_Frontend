import { useState, useEffect } from "react";
const splitChar = "abzkg";
export default function ActiveAccount({ match }) {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const feactActiveAccount = async (id) => {
    await fetch(process.env.REACT_APP_API + "/user/activeAccount/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
            setMessage(result.msg);
          }
        });
      }
    });
  };
  useEffect(() => {
    console.log(match.params);
    if (match.params.link) {
      const link = match.params.link;
      const arr = link.split(splitChar);
      feactActiveAccount(arr[1]);
    } else {
      setError("404");
    }
  }, [error]);
  return <>{error ? <div>Lỗi 404</div> : <div>{message}</div>}</>;
}

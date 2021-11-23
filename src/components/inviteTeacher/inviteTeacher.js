import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useToasts } from "react-toast-notifications";
function InviteTeacher({match}){
  const { addToast } = useToasts();
  const [error, setError] = useState(false);
  
  useEffect(() => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch("http://localhost:3001/userInClass/inviteTeacher/" + match.params.code, {
      method: 'POST',
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
      body: JSON.stringify({
        "code": match.params.code
        })
      })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
              addToast("Bạn đã trở thành giáo viên của lớp", {
                appearance: "success",
                autoDismiss: true,
              });
            }
          });
        }
      })
    
  })

  return (
    <div>
      {error ? <Redirect to='/login' /> : <Redirect to='/'/>}
    </div>
  );
}

export default InviteTeacher;
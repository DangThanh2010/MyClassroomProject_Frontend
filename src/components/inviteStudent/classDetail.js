import { useEffect, useState } from 'react';



function ClassDetail({match}){
 
  const [error, setError] = useState(false);
  

  useEffect(() => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch("http://localhost:3001/userInClass/inviteStudent/" + match.params.code, {
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
              alert('Thanh cong')
            }
          });
        }
      })
    
  })

  

  return (
    <div>
      123
    </div>
  );
}

export default ClassDetail;
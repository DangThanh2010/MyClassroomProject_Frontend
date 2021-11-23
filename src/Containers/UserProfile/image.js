import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.css";
const APIURL = "http://localhost:3001";

// Bua nao nho chinh lai userID cho trang nay

export default function UserProfilePage() {
  const userID = 1;
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(APIURL + "/user/" + 1, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        setImage(data.avatar);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const imageHandler = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post(APIURL + "/image/" + userID, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        setImage(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {image && <img className="avatar" src={image} alt="img" />}
      <input
        type="file"
        name="image"
        accept="image/*"
        multiple={false}
        onChange={imageHandler}
      />
    </div>
  );
}

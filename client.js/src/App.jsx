import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Oval } from "react-loader-spinner";

export default function App() {
  let currentUrl = window.location.href.slice(0, -1);
  const [status, setStatus] = useState("idle");
  const [link, setLink] = useState("");
  const [previewURl, setPreviewURL] = useState("");

  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function handleOnDrop(event) {
    // if the event is from the drag and  drop
    let imageFile;
    if (event.type == "drop") {
      event.preventDefault();
      event.stopPropagation();
      imageFile = event.dataTransfer.files[0];
    } else {
      // if the event is from the input method
      imageFile = event.target.files[0];
    }

    console.log(imageFile);
    // handlefile(imagaFile);
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    axios
      .post("/api/upload", formData, {
        headers: { "constent-Type": "multipart/form-data" },
      })
      .then((response) => {
        setLink(currentUrl + response.data);
        fakeLoader();
        setPreviewURL(URL.createObjectURL(imageFile));
      });
  }
  function fakeLoader() {
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 3000);
  }
  function copyText() {
    // const text = e.target.innerHTML;
    console.log(link);
    navigator.clipboard.writeText(link).then(() => {
      alert("text copied");
    });
  }

  // COMPONENTS-----------------------------------------------------------

  function Idle() {
    return (
      <div
        className="container"
        onDrop={(e) => {
          e.preventDefault();
        }}
      >
        <h2>Upload your image</h2>
        <p>File should be Jpeg, Png... </p>

        <div
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleOnDrop(e)}
          className="dropbox"
        >
          <img src="/upload.png" alt="" />
          <p>Drag and drop your image here</p>
        </div>

        <p>Or</p>

        <label htmlFor="fileInput" className="fileInputLabel">
          Choose a file
          <input
            type="file"
            name=""
            id="fileInput"
            hidden
            accept="image/*"
            onChange={(e) => handleOnDrop(e)}
          />
        </label>
      </div>
    );
  }

  function Loading() {
    return (
      <div className="progressContainer">
        <p>Uploading...</p>
        <Oval
          height={80}
          width={80}
          color="#2F80ED"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#F2F2F2"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  function Success() {
    return (
      <div className="container">
        <h2>Image successfully uploaded</h2>
        <div className="dropbox">
          <img src={previewURl} alt="" />
          {/* <p>Drag and drop your image here</p> */}
        </div>
        <div className="copy">
          <p>{link}</p>
          <button onClick={copyText}>Copy Link</button>
        </div>
      </div>
    );
  }
  return status == "idle" ? (
    <Idle />
  ) : status == "loading" ? (
    <Loading />
  ) : (
    <Success />
  );
}

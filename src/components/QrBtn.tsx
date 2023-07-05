import { useEffect, useRef, useState } from "react";
import "../components/PopupButt.css";
import axios, { Axios } from "axios";

export default function QrBtn() {
  // const [image, setImage] = useState("");

  const [imageData, setImageData] = useState("");

  const getImage = () => {
    axios
      .get("http://localhost:8080/api/image/img1.jpg", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setImageData(base64);
        console.log(base64);
        console.log(response.data);
      });
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    getImage();
  };

  return (
    <div>
      <div className="iconSize" onClick={toggleModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="#489788"
            d="M2 1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 2v6h6V3H3z"
          />
          <path fill="#489788" fill-rule="evenodd" d="M5 5h2v2H5z" />
          <path
            fill="#489788"
            d="M14 1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 2v6h6V3h-6z"
          />
          <path fill="#489788" fill-rule="evenodd" d="M17 5h2v2h-2z" />
          <path
            fill="#489788"
            d="M2 13h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zm1 2v6h6v-6H3z"
          />
          <path fill="#489788" fill-rule="evenodd" d="M5 17h2v2H5z" />
          <path
            fill="#489788"
            d="M23 19h-4v4h-5a1 1 0 0 1-1-1v-8v5h2v2h2v-6h-2v-2h-1h3v2h2v2h2v-4h1a1 1 0 0 1 1 1v5zm0 2v1a1 1 0 0 1-1 1h-1v-2h2z"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="bgFade">
          <div className="a">
            <div className="titleBlock">
              <p className="popupTitle">QR CODE</p>
              <div onClick={toggleModal} className="exit">
                X
              </div>
            </div>
            {/* <img src={pics} /> */}
            {/* <input type="file" /> */}
            <div>
              <img src={`data:;base64,${imageData}`} />
            </div>

            <div className="doneButt" onClick={toggleModal}>
              DONE
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

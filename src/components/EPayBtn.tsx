import { useEffect, useRef, useState } from "react";
import "../components/PopupButt.css";
import axios, { Axios } from "axios";

export default function EPayBtn() {
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
          width="21"
          height="21"
          viewBox="0 0 14 14"
        >
          <g
            fill="none"
            stroke="#489788"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 7.5v-2a1 1 0 0 0-1-1H1.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1H11a1 1 0 0 0 1-1V10M3.84 2L9.51.52a.49.49 0 0 1 .61.36L10.4 2" />
            <rect width="3.5" height="2.5" x="10" y="7.5" rx=".5" />
          </g>
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

import { MouseEvent, useEffect, useState } from "react";
import "../components/PopupButt.css"
import logo from "../img/logo.png"

export default function PopupButt() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div >
      <div
        className="popupButton"
        onClick={toggleModal}
      >
        ICON
      </div>

      {isOpen && (
        <div className="bgFade" onClick={toggleModal}>

          <div className="a">
            <div className="titleBlock">
              <p className="popupTitle">QR CODE</p>
              <div onClick={toggleModal} className="exit">X</div>
            </div>
            <img src={logo} className="imgSize" />
            <div className="doneButt">DONE</div>
          </div>

        </div>
      )}

    </div>
  )
}

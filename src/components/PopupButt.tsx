import { useEffect, useState } from "react";
import "../components/PopupButt.css";
import axios from "axios";


export default function PopupButt() {

  const input = document.querySelector('input[type="file"]') as HTMLInputElement | null;


  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // input.addEventListener('change', () => {
  //   const file = input.files[0];
  //   console.log(file.size);

  //   const url = URL.createObjectURL(file);

  //   const img = new Image();
  //   img.src = url;
  //   document.body.appendChild(img);

  //   console.log(url);
  // })
  // const [pics, setPics] = useState('');

  // useEffect(() => {
  //   loadPics()
  // }, [])

  // const loadPics = async () => {
  //   const pic = await axios.get(`http://localhost:8080/api/image/qr2.png`);
  //   setPics(pic.data);
  // };


  return (
    <div>
      <div className="popupButton" onClick={toggleModal}>
        ICON
      </div>

      {isOpen && (
        <div className="bgFade" onClick={toggleModal}>
          <div className="a">
            <div className="titleBlock">
              <p className="popupTitle">QR CODE</p>
              <div onClick={toggleModal} className="exit">
                X
              </div>
            </div>
            {/* <img src={pics} /> */}
            {/* <input type="file" /> */}
            <div className="doneButt">DONE</div>
          </div>
        </div>
      )}
    </div>
  );
}

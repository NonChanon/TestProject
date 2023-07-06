import { useEffect, useRef, useState } from "react";
import "../components/PopupButt.css";
import axios, { Axios } from "axios";


export default function PopupButt() {

  const input = document.querySelector('input[type="file"]') as HTMLInputElement | null;
  const [images, setImages] = useState([]);
  // const [image, setImage] = useState("");
  const inputRef = useRef(null);
  const varRef = useRef(images.length);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    // getImage()
  };

  // useEffect(() => {
  //   inputRef.current.focus();
  //   Axios.get(dx)
  // }, []);

  // const getImage = async () => {
  //   axios.post("http://localhost:8080/api/image/qr2.png", {
  //     responseType: "arraybuffer"
  //   })
  //     .then((res) => {
  //       const base64 = btoa(
  //         new Uint8Array(res.data).reduce(
  //           (data, byte) => data + String.fromCharCode(byte),
  //           ''
  //         )
  //       )
  //       console.log(base64)
  //       setImage(base64)
  //     })
  // }

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
        <div className="bgFade" >
          <div className="a">
            <div className="titleBlock">
              <p className="popupTitle">QR CODE</p>
              <div onClick={toggleModal} className="exit">
                X
              </div>
            </div>
            {/* <img src={pics} /> */}
            {/* <input type="file" /> */}
            {/* <img src={image} className="imgPopup" /> */}

            <div className="doneButt" onClick={toggleModal}>DONE</div>
          </div>
        </div>
      )}
    </div>
  );
}

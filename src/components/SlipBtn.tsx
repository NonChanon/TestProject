import { useEffect, useRef, useState } from "react";
import "../components/PopupButt.css";
import axios, { Axios } from "axios";

export default function SlipBtn() {
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
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="#489788" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2zM9 7h1m-1 6h6m-2 4h2" /></g></svg>
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

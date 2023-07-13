import React, { MouseEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import style from "./RecieptAS9.module.css";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface lotModel {
  name: string;
  totalDoc: number;
  batchDate: string;
  batchTime: string;
  approvalStatus: string;
  approvedBy: string;
  totalDuty: number;
  totalDubDutyAmount: number;
  totalPayment: number;
  ref1: string;
  ref2: string;
}

interface dataModel {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  content: lotModel[];
}

export default function RecieptAS9() {
  const [tab, setTab] = useState("all");
  const [datas, setDatas] = useState<dataModel>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    content: [],
  });
  const [startDate, setStartDate] = useState<Date | null>();
  const [lotName, setLotName] = useState({
    lotNameInput: "",
  });

  const [pageNo, setPageNo] = useState("0");

  const loadPageDatas = async (filter: string, pageNo: string) => {
    const dataRes = await axios.get(
      `http://localhost:8080/api${filter}?page=${pageNo}`
    );
    setDatas(dataRes.data);
    console.log("currentPage = " + dataRes.data.currentPage);
  };

  function renderPageNumber() {
    const list = [];
    if (datas.totalPages > 1) {
      list.push(
        <button
          onClick={() => {
            setPageNo(`${datas.currentPage == 0 ? 0 : datas.currentPage - 1}`);
            loadPageDatas(
              tab,
              `${datas.currentPage == 0 ? 0 : datas.currentPage - 1}`
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 2 16 16"
          >
            <g transform="translate(24 0) scale(-1 1)">
              <path
                fill="none"
                stroke="#489788"
                stroke-width="2"
                d="m9 6l6 6l-6 6"
              />
            </g>
          </svg>
        </button>
      );
      for (let i = 0; i < datas.totalPages; i++) {
        list.push(
          <button
            onClick={() => {
              setPageNo(`${i}`);
              loadPageDatas(tab, `${i}`);
            }}
            className={pageNo == `${i}` ? `${style.active}` : undefined}
          >
            {i + 1}
          </button>
        );
      }
      list.push(
        <button
          onClick={() => {
            setPageNo(
              `${
                datas.currentPage == datas.totalPages - 1
                  ? datas.totalPages - 1
                  : datas.currentPage + 1
              }`
            );
            loadPageDatas(
              tab,
              `${
                datas.currentPage == datas.totalPages - 1
                  ? datas.totalPages - 1
                  : datas.currentPage + 1
              }`
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="7 2 16 16"
          >
            <path
              fill="none"
              stroke="#489788"
              stroke-width="2"
              d="m9 6l6 6l-6 6"
            />
          </svg>
        </button>
      );
    }
    return <div>{list}</div>;
  }

  const path = useLocation().pathname;
  console.log("path = " + path);
  console.log(useLocation());

  let grouped: any = datas.content;

  const loadDatas = async () => {
    const dataRes = await axios.get(
      `http://localhost:8080/api/invoice/approved`
    );
    setDatas(dataRes.data);
    console.log("getData is : " + dataRes.data);
  };

  const onSearch = async (e: MouseEvent, request: object) => {
    e.preventDefault();
    moment;
    const dataRes = await axios.post(
      `http://localhost:8080/api/lots/search/recAs9`,
      request
    );
    setDatas(dataRes.data);
    console.log("search data is " + dataRes.data);
  };

  const updateLotNameInput = (e: {
    target: { name: string; value: string };
  }) => {
    console.log(e.target.name);
    setLotName({
      ...lotName,
      [e.target.name]: e.target.value,
    });
    console.log(lotName.lotNameInput);
  };

  console.log(grouped);

  if (datas.content != null) {
    grouped = datas.content.reduce((acc: any, obj: lotModel) => {
      console.log("Acc ======>", acc);
      const key: string = obj.batchDate;
      acc[key] = acc[key] || [];
      acc[key].push(obj);
      return acc;
    }, {});
  }

  console.log(grouped);

  const batchDate = Object.keys(grouped);
  console.log("batchDate is : " + Object.keys(grouped));

  const [imageData, setImageData] = useState("");
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const getPayment = async (type: any) => {
    await axios
      .get(
        `http://localhost:8080/api/${localStorage.lotName}/download/${type}`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setImageData(base64);
        // console.log(base64);
        console.log(response.data);
      });
  };

  const toggleModal1 = (lotname: string, type: string) => {
    setIsOpen1(!isOpen1);
    localStorage.setItem("lotName", `${lotname}`);
    getPayment(type);
    console.log(imageData);
    console.log(localStorage.lotName);
    console.log("asdkasdsaoidj");
  };

  const toggleModal2 = (lotname: string, type: string) => {
    setIsOpen2(!isOpen2);
    localStorage.setItem("lotName", `${lotname}`);
    getPayment(type);
    console.log(imageData);
    console.log(localStorage.lotName);
    console.log("asdkasdsaoidj");
  };

  const onApprove = async (e: React.MouseEvent, status: string) => {
    e.preventDefault();
    console.log(status);
    await axios.put(`http://localhost:8080/api/invoice/${status}`);
    setIsOpen1(!isOpen1);
    setIsOpen2(!isOpen2);
    loadDatas();
  };

  useEffect(() => {
    console.log("Trigger use Effect");
    loadDatas();
  }, [useLocation().key]);

  const dataRecAS9Table = batchDate.map((data) => {
    let sumDoc = 0,
      sumTotalDuty = 0,
      sumTotalDubDutyAmount = 0,
      sumTotalPayment = 0;

    return (
      <div>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Lot Name</th>
              <th>Batch Date</th>
              <th>Batch Time</th>
              <th>InstInfo ID</th>
              <th>TaxPayer ID</th>
              <th>Total Doc</th>
              <th>Total Payment</th>
              <th>AS9</th>
              <th>Receipt</th>
            </tr>
          </thead>
          {grouped[data].map((lot: lotModel, i: number) => {
            console.log(lot);
            sumDoc += lot.totalDoc;
            sumTotalDuty += lot.totalDuty;
            sumTotalDubDutyAmount += lot.totalDubDutyAmount;
            sumTotalPayment += lot.totalPayment;

            return (
              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  <td>{lot.name}</td>
                  <td>{lot.batchDate}</td>
                  <td>{lot.batchTime}</td>
                  <td></td>
                  <td></td>
                  <td>{lot.totalDoc}</td>
                  <td>{lot.totalPayment}</td>
                  <td>
                    <div className="As9Button">
                      <div
                        className="iconSize"
                        onClick={(e) => toggleModal1(lot.name, "as9")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="25"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="#489788"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                          >
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2zM9 7h1m-1 6h6m-2 4h2" />
                          </g>
                        </svg>
                      </div>

                      {isOpen1 && (
                        <div className="bgFade">
                          <div className="a">
                            <div className="titleBlock">
                              <p className="popupTitle">AS9</p>
                              <div
                                onClick={(e) => setIsOpen1(!isOpen1)}
                                className="exit"
                              >
                                X
                              </div>
                            </div>
                            <div>
                              <iframe
                                src={`data:application/pdf;base64,${imageData}`}
                                className={`${style.pdfSize}`}
                              />
                            </div>

                            <button
                              onClick={(e) => onApprove(e, lot.name)}
                              className="doneButt"
                            >
                              DONE
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="ReceiptButton">
                      <div
                        className="iconSize"
                        onClick={(e) => toggleModal2(lot.name, "receipt")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#489788"
                            d="M3 5.25A2.25 2.25 0 0 1 5.25 3h9.5A2.25 2.25 0 0 1 17 5.25V14h4v3.75A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V5.25ZM17 19.5h.75a1.75 1.75 0 0 0 1.75-1.75V15.5H17v4ZM5.25 4.5a.75.75 0 0 0-.75.75v12.5c0 .966.784 1.75 1.75 1.75h9.25V5.25a.75.75 0 0 0-.75-.75h-9.5Zm2 2.5a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Zm-.75 4.75a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75ZM7.25 15a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                          />
                        </svg>
                      </div>

                      {isOpen2 && (
                        <div className="bgFade">
                          <div className="a">
                            <div className="titleBlock">
                              <p className="popupTitle">Receipt</p>
                              <div
                                onClick={(e) => setIsOpen2(!isOpen2)}
                                className="exit"
                              >
                                X
                              </div>
                            </div>
                            <div>
                              <iframe
                                src={`data:application/pdf;base64,${imageData}`}
                                className={`${style.pdfSize}`}
                              />
                            </div>

                            <button
                              onClick={(e) => onApprove(e, lot.name)}
                              className="doneButt"
                            >
                              DONE
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
          <tfoot>
            <tr>
              <th className={`${style.ltb}`}>Total</th>
              <th className={`${style.ltb}`}></th>

              <th className={`${style.ltb}`}></th>
              <th className={`${style.ltb}`}></th>

              <th className={`${style.ltb}`}></th>
              <th className={`${style.ltb}`}></th>
              <th className={`${style.ltb}`}>{sumDoc}</th>
              <th className={`${style.ltb}`}>{sumTotalPayment}</th>
              <th className={`${style.ltb}`}></th>
              <th className={`${style.ltb}`}></th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  });

  return (
    <div className={`${style.space2}`}>
      <div className={`${style.title} ${style.spaceTitle}`}>
        <div className={`${style.line}`}></div>
        <div>Reciept & AS9</div>
      </div>

      <div className={`shadow ${style.row} ${style.btw} ${style.spaceTitle}`}>
        <div className={`${style.FilterButon}`}>
          <button className={`BatchDate ${style.button1}`}>
            <div className={`${style.row}`}>
              <DatePicker
                id="batchDate"
                dateFormat="dd/MM/yyy"
                selected={startDate}
                onChange={(date: Date) => {
                  setStartDate(date);
                  console.log("Selected date is : " + date.toLocaleString());
                }}
                isClearable
                placeholderText="Batch Date"
                className={`${style.calendarDate}`}
              />
              <svg
                style={{ margin: "0px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#7F7F7F"
                  d="M8 14q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm4 0q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm4 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Z"
                />
              </svg>
            </div>
            <div className={`${style.line2}`}></div>
          </button>

          <button className={`LotName ${style.button1}`}>
            <div className={`${style.row}`}>
              <input
                name="lotNameInput"
                className="form-control"
                style={{
                  height: "100%",
                  border: "0",
                  fontSize: "14px",
                  fontFamily: "'Rubik', sans-serif",
                  margin: "0",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
                placeholder="Lot Name"
                onChange={(e) => updateLotNameInput(e)}
              />
            </div>
            <div className={`${style.line2}`}></div>
          </button>
        </div>

        <button
          className={`${style.SearchButton}`}
          onClick={(e) =>
            onSearch(e, {
              batchDate:
                startDate === null
                  ? ""
                  : moment(startDate).format("DD/MM/yyyy").toString(),
              lotName: lotName.lotNameInput,
            })
          }
        >
          <div className={`${style.row}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <g
                fill="none"
                fill-rule="evenodd"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="8.5" cy="8.5" r="5" />
                <path d="M17.571 17.5L12 12" />
              </g>
            </svg>
            <div className={`${style.space5}`}>Search</div>
          </div>
        </button>
      </div>

      <div className="Transection">
        <div className="BatchBar shadow ">
          <div className={`${style.space3}`}>
            <div>
              <table>{dataRecAS9Table}</table>
            </div>
          </div>
        </div>
      </div>

      <div className={`${style.pagination} ${style.end}`}>
        {renderPageNumber()}
      </div>
    </div>
  );
}

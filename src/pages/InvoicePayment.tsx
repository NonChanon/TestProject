import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import style from "./InvoicePayment.module.css";

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
  paymentStatus: string;
}

interface customerModel {
  title: string;
  firstname: string;
  lastname: string;
  taxPayerId: string;
  instInfoId: string;
  totalDuty: number;
  totalDubDutyAmount: number;
  totalPayment: number;
  finalPaymentDate: string;
  completed: boolean;
  address: addressModel;
  contract: contractModel;
}

interface addressModel {
  village: string;
  addressNo: string;
  floor: string;
  villageNo: string;
  alley: string;
  street: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
}

interface contractModel {
  number: string;
  startDate: string;
  endDate: string;
  applicantId: string;
  branchNumber: string;
  branchType: string;
  relatedStatus: string;
}

interface IVStatusModel {
  pending: number;
  approved: number;
}

interface dataModel {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  content: lotModel[];
  sumIVStatus: IVStatusModel;
}

export default function InvoicePayment() {
  const [datas, setDatas] = useState<dataModel>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    content: [],
    sumIVStatus: {
      approved: 0,
      pending: 0,
    },
  });

  const [startDate = null, setStartDate] = useState<Date | null>();
  const [lotName, setLotName] = useState({
    lotNameInput: "",
  });
  const [tab, setTab] = useState("/invoice/all");
  const [pageNo, setPageNo] = useState("0");

  const path = useLocation().pathname;
  console.log("path = " + path);
  console.log(useLocation());

  let grouped = datas;

  const loadDatas = async () => {
    const dataRes = await axios.get(`http://localhost:8080/api/invoice/all`);
    setDatas(dataRes.data);
    console.log("getData is : " + dataRes.data);
  };

  const loadPageDatas = async (filter: string, pageNo: string) => {
    const dataRes = await axios.get(
      `http://localhost:8080/api${filter}?page=${pageNo}`
    );
    setDatas(dataRes.data);
    console.log("currentPage = " + dataRes.data.currentPage);
  };

  const loadFilterDatas = async (filter: string) => {
    const dataRes = await axios.get(`http://localhost:8080/api${filter}`);
    setDatas(dataRes.data);
    console.log("getData is : " + dataRes.data);
  };

  const onSearch = async (e: React.MouseEvent, request: object) => {
    e.preventDefault();
    moment;
    const dataRes = await axios.post(
      `http://localhost:8080/api/lots/search/iv`,
      request
    );
    setDatas(dataRes.data);
    console.log("search data is " + dataRes.data);
  };

  const updateLotNameInput = (e: { target: { name: any; value: any } }) => {
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

  const onApprove = async (e: React.MouseEvent, status: string) => {
    e.preventDefault();
    console.log(status);
    await axios.put(`http://localhost:8080/api/invoice/${status}`);
    setIsOpen1(!isOpen1);
    setIsOpen2(!isOpen2);
    setIsOpen3(!isOpen3);
    loadDatas();
  };

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  console.log(grouped);

  const [imageData, setImageData] = useState("");

  const getPayment = async (type: string) => {
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
    console.log(localStorage.lotName);
    console.log("asdkasdsaoidj");
  };

  const toggleModal2 = (lotname: string, type: string) => {
    setIsOpen2(!isOpen2);
    localStorage.setItem("lotName", `${lotname}`);
    getPayment(type);
    console.log(localStorage.lotName);
    console.log("asdkasdsaoidj");
  };

  const toggleModal3 = (lotname: string, type: string) => {
    setIsOpen3(!isOpen3);
    localStorage.setItem("lotName", `${lotname}`);
    getPayment(type);
    console.log(localStorage.lotName);
    console.log("asdkasdsaoidj");
  };

  useEffect(() => {
    console.log("Trigger use Effect");
    loadDatas();
  }, [useLocation().key]);

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

  let sumDoc = 0,
    sumTotalDuty = 0,
    sumTotalDubDutyAmount = 0,
    sumTotalPayment = 0;

  return (
    <div className={`${style.space2}`}>
      <div className={`${style.title} ${style.spaceTitle}`}>
        <div className={`${style.line}`}></div>
        <div>Invoice Payment</div>
      </div>

      <div className={`shadow ${style.searchContainer}`}>
        <div className={style.filterContainer}>
          <button className={`BatchDate ${style.button1}`}>
            <div className={style.dateLayout}>
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
        <div className={style.searchLayout}>
          <button
            className={`${style.searchButton}`}
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
            <div className={`${style.buttonLayout}`}>
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
      </div>
      <div className={`Transaction`}>
        <div className={`BatchBar shadow`}>
          <div className={`${style.space3}`}>
            <div className={`${style.filter} ${style.spaceTitle2}`}>
              <button
                className={
                  tab === "/invoice/all"
                    ? `${style.filterButtonActive}`
                    : `${style.filterButton}`
                }
                onClick={() => {
                  setTab("/invoice/all");
                  setPageNo("0");
                  loadFilterDatas("/invoice/all");
                }}
              >
                <p style={{ padding: "3px 8px 3px 8px" }}>All</p>
              </button>
              <button
                className={
                  tab === "/invoice/approved"
                    ? `${style.filterButtonActive}`
                    : `${style.filterButton}`
                }
                onClick={() => {
                  setTab("/invoice/approved");
                  setPageNo("0");
                  loadFilterDatas("/invoice/approved");
                }}
              >
                <p className={`${style.row}`}>
                  Approved
                  <p className={`${style.green}`}>
                    {datas.sumIVStatus.approved}
                  </p>
                </p>
              </button>

              <button
                className={
                  tab === "/invoice/pending"
                    ? `${style.filterButtonActive}`
                    : `${style.filterButton}`
                }
                onClick={() => {
                  setTab("/invoice/pending");
                  setPageNo("0");
                  loadFilterDatas("/invoice/pending");
                }}
              >
                <p className={`${style.row} `}>
                  Pending
                  <p className={`${style.yellow}`}>
                    {datas.sumIVStatus.pending}
                  </p>
                </p>
              </button>
            </div>
            {datas.content.length > 0 ? (
              <div>
                <div className={`${style.Table} ${style.top}`}>
                  <table className={`${style.transactionTable}`}>
                    <thead>
                      <tr className={`${style.tableTitle}`}>
                        <th>No.</th>
                        <th>Lot Name</th>
                        <th>Batch Date</th>
                        <th>Batch Time</th>
                        <th>Total Doc</th>
                        <th>Total Duty</th>
                        <th>TotalDubDutyAmount</th>
                        <th>Total Payment</th>
                        <th>Ref 1</th>
                        <th>Ref 2</th>
                        <th>Payment Status</th>
                        <th>QR Payment</th>
                        <th>Pay in slip</th>
                        <th>e-Payment</th>
                      </tr>
                    </thead>
                    {datas.content.map((lot: lotModel, i: number) => {
                      console.log(lot);
                      sumDoc += lot.totalDoc;
                      sumTotalDuty += lot.totalDuty;
                      sumTotalDubDutyAmount += lot.totalDubDutyAmount;
                      sumTotalPayment += lot.totalPayment;
                      const PaymentStatus = lot.paymentStatus;
                      let display;
                      if (PaymentStatus == "Pending") {
                        display = <p className={style.Pending}>Pending</p>;
                      } else if (PaymentStatus == "Approved") {
                        display = <p className={style.Approved}>Approve</p>;
                      }
                      return (
                        <tbody>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{lot.name}</td>
                            <td>{lot.batchDate}</td>
                            <td>{lot.batchTime}</td>
                            <td>{lot.totalDoc}</td>
                            <td>{lot.totalDuty}</td>
                            <td>{lot.totalDubDutyAmount}</td>
                            <td>{lot.totalPayment}</td>
                            <td>{lot.ref1}</td>
                            <td>{lot.ref2}</td>
                            <td>{display}</td>
                            <td>
                              <div className="QrButton">
                                <div
                                  className="iconSize"
                                  onClick={(e) => toggleModal1(lot.name, "qr")}
                                >
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
                                    <path
                                      fill="#489788"
                                      fill-rule="evenodd"
                                      d="M5 5h2v2H5z"
                                    />
                                    <path
                                      fill="#489788"
                                      d="M14 1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 2v6h6V3h-6z"
                                    />
                                    <path
                                      fill="#489788"
                                      fill-rule="evenodd"
                                      d="M17 5h2v2h-2z"
                                    />
                                    <path
                                      fill="#489788"
                                      d="M2 13h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zm1 2v6h6v-6H3z"
                                    />
                                    <path
                                      fill="#489788"
                                      fill-rule="evenodd"
                                      d="M5 17h2v2H5z"
                                    />
                                    <path
                                      fill="#489788"
                                      d="M23 19h-4v4h-5a1 1 0 0 1-1-1v-8v5h2v2h2v-6h-2v-2h-1h3v2h2v2h2v-4h1a1 1 0 0 1 1 1v5zm0 2v1a1 1 0 0 1-1 1h-1v-2h2z"
                                    />
                                  </svg>
                                </div>

                                {isOpen1 && (
                                  <div className="bgFade">
                                    <div className="a">
                                      <div className="titleBlock">
                                        <p className="popupTitle">
                                          QR Code Payment
                                        </p>
                                        <div
                                          onClick={(e) => setIsOpen1(!isOpen1)}
                                          className="exit"
                                        >
                                          X
                                        </div>
                                      </div>
                                      <div>
                                        <img
                                          src={`data:;base64,${imageData}`}
                                          className={`${style.imgPopup}`}
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
                              <div className="SlipButton">
                                <div
                                  className="iconSize"
                                  onClick={(e) =>
                                    toggleModal2(lot.name, "slip")
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
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
                                {isOpen2 && (
                                  <div className="bgFade">
                                    <div className="a">
                                      <div className="titleBlock">
                                        <p className="popupTitle">
                                          Slip Payment
                                        </p>
                                        <div
                                          onClick={(e) => setIsOpen2(!isOpen2)}
                                          className="exit"
                                        >
                                          X
                                        </div>
                                      </div>
                                      <div>
                                        <img
                                          src={`data:;base64,${imageData}`}
                                          className="imgPopup"
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
                              <div className="EPaymentButton">
                                <div
                                  className="iconSize"
                                  onClick={(e) =>
                                    toggleModal3(lot.name, "ePay")
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
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

                                {isOpen3 && (
                                  <div className="bgFade">
                                    <div className="a">
                                      <div className="titleBlock">
                                        <p className="popupTitle">E-Payment</p>
                                        <div
                                          onClick={(e) => setIsOpen3(!isOpen3)}
                                          className="exit"
                                        >
                                          X
                                        </div>
                                      </div>
                                      <div>
                                        <img
                                          src={`data:;base64,${imageData}`}
                                          className="imgPopup"
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
                        <th className={`${style.ltb}`}>{sumDoc}</th>
                        <th className={`${style.ltb}`}>{sumTotalDuty}</th>
                        <th className={`${style.ltb}`}>
                          {sumTotalDubDutyAmount}
                        </th>
                        <th className={`${style.ltb}`}>{sumTotalPayment}</th>
                        <th className={`${style.ltb}`}></th>
                        <th className={`${style.ltb}`}></th>
                        <th className={`${style.ltb}`}></th>
                        <th className={`${style.ltb}`}></th>
                        <th className={`${style.ltb}`}></th>
                        <th className={`${style.ltb}`}></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div className={`${style.pagination} ${style.end}`}>
                    {renderPageNumber()}
                  </div>
                </div>
              </div>
            ) : undefined}

            {/* <table>{dataInvoiceTable}</table> */}
          </div>
        </div>
      </div>
    </div>
  );
}

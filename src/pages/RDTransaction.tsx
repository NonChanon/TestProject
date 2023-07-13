import style from "./RDTransaction.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

interface lotModel {
  name: string;
  batchDate: string;
  batchTime: string;
  sendRdDate: string;
  sendRdStatus: number;
  totalDuty: number;
  totalDubDutyAmount: number;
  totalPayment: number;
}

interface dataModel {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  content: lotModel[];
  sumRdStatus: rdStatusModel;
}

interface rdStatusModel {
  success: number;
  fail: number;
}

export default function RDTransaction() {
  const [datas, setDatas] = useState<dataModel>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    content: [],
    sumRdStatus: {
      success: 0,
      fail: 0,
    },
  });
  const [pageNo, setPageNo] = useState("0");
  const [startDate = null, setStartDate] = useState<Date | null>();
  const [tab, setTab] = useState("/rd/all");
  const [permission, setPermission] = useState(false);
  const [lotName, setLotName] = useState({
    lotNameInput: "",
  });

  const loadDatas = async () => {
    const dataRes = await axios.get(`http://localhost:8080/api/rd/all`);
    setDatas(dataRes.data);
    console.log("loadDatas : " + dataRes.data);
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
      `http://localhost:8080/api/lots/search/rd`,
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

  useEffect(() => {
    console.log("trigger useEffect");
    for (let i = 1; i <= 4; i++) {
      if (
        localStorage.getItem(`permission${i}`) === "1" ||
        localStorage.getItem(`permission${i}`) === "3"
      ) {
        setPermission(true);
      }
    }
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

  let sumTotalDuty = 0,
    sumTotalDubDutyAmount = 0,
    sumTotalPayment = 0;

  return (
    <div className={style.space2}>
      <div className={`${style.title} ${style.spaceTitle}`}>
        <div className={style.line}></div>
        <div>RD Transaction</div>
      </div>
      <div className="img" style={{ backgroundColor: "red" }}>
        {/* <img src={`data:;base64,${imageData}`} /> */}
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
          <div className={style.space3}>
            <div className={`${style.filter} ${style.spaceTitle2}`}>
              <button
                className={
                  tab === "/rd/all"
                    ? `${style.filterButtonActive}`
                    : `${style.filterButton}`
                }
                onClick={() => {
                  setTab("/rd/all");
                  setPageNo("0");
                  loadFilterDatas("/rd/all");
                }}
              >
                <p style={{ padding: "3px 8px 3px 8px" }}>All</p>
              </button>
              <button
                className={
                  tab === "/rd/success"
                    ? `${style.filterButtonActive}`
                    : `${style.filterButton}`
                }
                onClick={() => {
                  setTab("/rd/success");
                  setPageNo("0");
                  loadFilterDatas("/rd/success");
                }}
              >
                <p className={`${style.row}`}>
                  Success
                  <p className={style.green}>{datas.sumRdStatus.success}</p>
                </p>
              </button>
              <button
                className={
                  tab === "/rd/fail"
                    ? `${style.filterButtonActive}`
                    : `${style.filterButton}`
                }
                onClick={() => {
                  setTab("/rd/fail");
                  setPageNo("0");
                  loadFilterDatas("/rd/fail");
                }}
              >
                <p className={`${style.row}`}>
                  Fail
                  <p className={style.red}>{datas.sumRdStatus.fail}</p>
                </p>
              </button>
            </div>
            {datas.content.length > 0 ? (
              <div>
                {/* <div
                    className={`${style.Batch} shadow ${style.row} ${style.space4}`}
                  >
                    <p className={style.tab}>Batch Date : {data}</p>
                  </div> */}
                <div className={`${style.transactionTable} ${style.top}`}>
                  <table>
                    <tr>
                      <th>No.</th>
                      <th>Lot Name</th>
                      <th>Batch Date</th>
                      <th>Batch Time</th>
                      <th>Send RD Date</th>
                      <th>Send RD Status</th>
                      <th>Total Duty</th>
                      <th>TotalDubDutyAmount</th>
                      <th>Total Payment</th>
                      <th>Payment Status</th>
                    </tr>
                    {datas.content.map((lot: lotModel, i: number) => {
                      sumTotalDuty += lot.totalDuty;
                      sumTotalDubDutyAmount += lot.totalDubDutyAmount;
                      sumTotalPayment += lot.totalPayment;
                      const RDStatus = lot.sendRdStatus;
                      let display;
                      if (RDStatus != 0) {
                        display = (
                          <p className={style.Fail}>
                            {" "}
                            Fail ({lot.sendRdStatus}){" "}
                          </p>
                        );
                      } else {
                        display = <p className={style.Success}> Success </p>;
                      }
                      return (
                        <tr>
                          <td width="5%">{i + 1}</td>
                          {permission ? (
                            <td width="10%">
                              <Link to={`/rd/${lot.name}`} state={{ lot: lot }}>
                                {lot.name}
                              </Link>
                            </td>
                          ) : (
                            <td width="10%">
                              <div>{lot.name}</div>
                            </td>
                          )}
                          <td width="8%">{lot.batchDate}</td>
                          <td width="10%">{lot.batchTime}</td>
                          <td width="15%">{lot.sendRdDate}</td>
                          <td width="12%">{display}</td>
                          <td width="10%">{lot.totalDuty}</td>
                          <td width="10%">{lot.totalDubDutyAmount}</td>
                          <td width="10%">{lot.totalPayment}</td>
                          <td width="9%">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#ecbf21"
                                d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zm1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85l-.7.71zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2zm-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z"
                              />
                            </svg>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className={style.ltb}>Total</td>
                      <td className={style.ltb}></td>
                      <td className={style.ltb}></td>
                      <td className={style.ltb}></td>
                      <td className={style.ltb}></td>
                      <td className={style.ltb}></td>
                      <td className={style.ltb}>{sumTotalDuty}</td>
                      <td className={style.ltb}>{sumTotalDubDutyAmount}</td>
                      <td className={style.ltb}>{sumTotalPayment}</td>
                      <td className={style.ltb}></td>
                    </tr>
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
          </div>
        </div>
      </div>
    </div>
  );
}

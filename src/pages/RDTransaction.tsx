import style from "./RDTransaction.module.css";
import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, NavLink } from "react-router-dom";
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

export default function RDTransaction() {
  const [datas, setDatas] = useState<any>({
    content: [],
    sumRdStatus: {
      success: 0,
      fail: 0
    }
  });

  const [startDate, setStartDate] = useState<Date | null>();

  const [lotName, setLotName] = useState({
    lotNameInput: "",
  });

  let grouped = datas;
  const path = useLocation().pathname;

  //load data by api to backend
  const loadDatas = async () => {
    const dataRes = await axios.get(`http://localhost:8080/api${path}`);
    setDatas(dataRes.data);
    console.log("loadDatas : " + dataRes.data);
  };

  const onSearch = async (e: MouseEvent, request: object) => {
    e.preventDefault();
    moment
    const dataRes = await axios.post(`http://localhost:8080/api/lots/search/rd`, request);
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

  if (datas.content != null) {
    grouped = datas.content.reduce((acc: {[key: string]:lotModel[]}, obj: lotModel) => {
      console.log("Acc ======>", acc);
      const key: string = obj.batchDate;
      acc[key] = acc[key] || [];
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const batchDate = Object.keys(grouped);

  useEffect(() => {
    console.log("trigger useEffect");
    loadDatas();
  }, [useLocation().key]);

  return (
    <div className={style.space2}>
      <div className={`${style.title} ${style.spaceTitle}`}>
        <div className={style.line}></div>
        <div>RD Transaction</div>
      </div>

      <div className={`shadow ${style.row} ${style.btw} ${style.spaceTitle}`}>
        <div>
          <button className={`BatchDate ${style.button1}`}>
            <div className={style.row}>
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
                className="calendarDate"
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
            <div className={style.line2}></div>
          </button>

          <button className={`LotName ${style.button1}`}>
            <div className={style.row}>
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
            <div className={style.line2}></div>
          </button>
        </div>

        <button 
        className={style.SearchButton}
        onClick={(e) => onSearch(e, { batchDate: startDate === null ? "" : moment(startDate).format('DD/MM/yyyy').toString(), lotName: lotName.lotNameInput })}
        >
          <div className={style.row}>
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
            <div className={style.space5}>Search</div>
          </div>
        </button>
      </div> 

      <div className={style.Transection}>
        <div className={`${style.BatchBar} shadow`}>
          <div className={style.space3}>
            <div className={`filter ${style.spaceTitle2}`}>
              <Link
                className={`${style.button} ${style.button}:hover ${style.black} ${style.active}`}
                to="/rd/all"
              >
                <p className={`${style.row} ${style.fontSize}`}>All</p>
              </Link>
              <Link
                className={`${style.button} ${style.button}:hover ${style.black}`}
                to="/rd/success"
              >
                <p className={`${style.row} ${style.fontSize}`}>
                  Success
                  <p className={style.green}>{datas.sumRdStatus.success}</p>
                </p>
              </Link>
              <Link
                className={`${style.button} ${style.button}:hover ${style.black}`}
                to="/rd/fail"
              >
                <p className={`${style.row} ${style.fontSize}`}>
                  Fail
                  <p className={style.red}>{datas.sumRdStatus.fail}</p>
                </p>
              </Link>
            </div>

            {batchDate.map((data: string) => {
              let sumTotalDuty = 0,
                  sumTotalDubDutyAmount = 0,
                  sumTotalPayment = 0;
              return (
                <div>
                  <div
                    className={`${style.Batch} shadow ${style.row} ${style.space4}`}
                  >
                    <p className={style.tab}>Batch Date : {data}</p>
                  </div>
                  <div className={`${style.Table} ${style.top}`}>
                    <table className={style.transactionTable}>
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
                      {grouped[data].map((lot: lotModel, i:number) => {
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
                            <td width="10%"><Link to={`/${lot.name}`} state={{ lot: lot }}>{lot.name}</Link></td>
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
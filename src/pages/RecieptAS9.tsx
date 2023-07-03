import React, { MouseEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import style from "../pages/RecieptAS9.module.css";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

interface lotModel {
  name: string;
  totalDoc: number;
  batchDate: string;
  approvalStatus: string;
  approvedBy: string;
  totalDuty: number;
  totalDubDutyAmount: number;
  totalPayment: number;
  ref1: string;
  ref2: string;
}

export default function RecieptAS9() {
  const [tab, setTab] = useState("all");
  const [datas, setDatas] = useState<any>({
    content: [],
    sumStatus: {
      approved: 0,
      pending: 0,
      invalidData: 0,
      denied: 0,
    },
  });
  const [startDate, setStartDate] = useState<Date | null>();
  const [lotName, setLotName] = useState({
    lotNameInput: "",
  });

  const path = useLocation().pathname;
  console.log("path = " + path);
  console.log(useLocation());

  let grouped = datas;

  const loadDatas = async () => {
    const dataRes = await axios.get(`http://localhost:8080/api${path}`);
    setDatas(dataRes.data);
    console.log("getData is : " + dataRes.data);
  };

  const onSearch = async (e: MouseEvent, request: object) => {
    e.preventDefault();
    moment;
    const dataRes = await axios.post(
      `http://localhost:8080/api/lots/search/dataresult`,
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

  console.log(grouped);

  const batchDate = Object.keys(grouped);
  console.log("batchDate is : " + Object.keys(grouped));

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
              <th>Total Doc</th>
              <th>Batch Date</th>
              <th>Batch Time</th>
              <th>InstInfo ID</th>
              <th>TaxPayer ID</th>
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
                  <td>{lot.totalDoc}</td>
                  <td>{lot.batchDate}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{lot.totalPayment}</td>
                  <td className="action">
                    {/* <Routes>
                      <Route path={`/${lot.name}`} element={<DetailCollection />} />
                    </Routes> */}
                    <NavLink
                      to={`/${lot.name}?page=0`}
                      end
                      state={{ lot: lot }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="#489788"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2zM9 7h1m-1 6h6m-2 4h2" />
                        </g>
                      </svg>
                    </NavLink>
                  </td>
                  <td className="action">
                    {/* <Routes>
                      <Route path={`/${lot.name}`} element={<DetailCollection />} />
                    </Routes> */}
                    <NavLink
                      to={`/${lot.name}?page=0`}
                      end
                      state={{ lot: lot }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#489788"
                          d="M21 11h-3V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6a1 1 0 0 0-1-1zM5 19a1 1 0 0 1-1-1V5h12v13c0 .351.061.688.171 1H5zm15-1a1 1 0 0 1-2 0v-5h2v5z"
                        />
                        <path
                          fill="#489788"
                          d="M6 7h8v2H6zm0 4h8v2H6zm5 4h3v2h-3z"
                        />
                      </svg>
                    </NavLink>
                  </td>
                </tr>
              </tbody>
            );
          })}
          <tfoot>
            <tr>
              <th className={`${style.ltb}`}>Total</th>
              <th className={`${style.ltb}`}></th>
              <th className={`${style.ltb}`}>{sumDoc}</th>
              <th className={`${style.ltb}`}></th>
              <th className={`${style.ltb}`}></th>
              <th className={`${style.ltb}`}></th>
              <th className={`${style.ltb}`}></th>
              <th className={`${style.ltb}`}>{sumTotalPayment}</th>
              <th className={`${style.ltb}`}></th>
              <th className={`${style.ltb}`}></th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  });

  const loadFilterDatas = async (filter: string) => {
    const dataRes = await axios.get(`http://localhost:8080/api${filter}`);
    setDatas(dataRes.data);
    console.log("getData is : " + dataRes.data);
  };

  return (
    <div className={`${style.space2}`}>
      <div className={`${style.title} ${style.spaceTitle}`}>
        <div className={`${style.line}`}></div>
        <div>Reciept & AS9</div>
      </div>

      <div className={`shadow ${style.row} ${style.btw} ${style.spaceTitle}`}>
        <div className="FilterButon">
          <button className={`${style.button1} `}>
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
            <div className={`${style.filter} ${style.spaceTitle2}`}>
              <button
                onClick={() => {
                  setTab("all");
                  loadFilterDatas("/lots/all");
                }}
                className={
                  tab === "all"
                    ? `${style.filterButtonActive}`
                    : `${style.filterButton}`
                }
              >
                <p style={{ padding: "3px 8px 3px 8px" }}>All</p>
              </button>
              <button
                onClick={() => {
                  setTab("approved");
                  loadFilterDatas("/lots/approved");
                }}
                className={
                  tab === "approved"
                    ? `${style.filterButtonActive}`
                    : `${style.filterButton}`
                }
              >
                <p className={`${style.row}`}>
                  Approved
                  <p className={`${style.green}`}>{datas.sumStatus.approved}</p>
                </p>
              </button>
              <button
                onClick={() => {
                  setTab("pending");
                  loadFilterDatas("/lots/pending");
                }}
                className={
                  tab === "pending"
                    ? `${style.filterButtonActive}`
                    : `${style.filterButton}`
                }
              >
                <p className={`${style.row}`}>
                  Pending
                  <p className={`${style.yellow}`}>{datas.sumStatus.pending}</p>
                </p>
              </button>
              <button
                onClick={() => {
                  setTab("invaliddata");
                  loadFilterDatas("/lots/invaliddata");
                }}
                className={
                  tab === "invaliddata"
                    ? `${style.filterButtonActive}`
                    : `${style.filterButton}`
                }
              >
                <p className={`${style.row}`}>
                  Invalid Data
                  <p className={`${style.red}`}>
                    {datas.sumStatus.invalidData}
                  </p>
                </p>
              </button>
              <button
                onClick={() => {
                  setTab("denied");
                  loadFilterDatas("/lots/denied");
                }}
                className={
                  tab === "denied"
                    ? `${style.filterButtonActive}`
                    : `${style.filterButton}`
                }
              >
                <p className={`${style.row}`}>
                  Denied
                  <p className={`${style.gray}`}>{datas.sumStatus.denied}</p>
                </p>
              </button>
            </div>

            <div>
              <table>{dataRecAS9Table}</table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

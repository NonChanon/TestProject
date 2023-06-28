import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



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

export default function InvoicePayment() {
  const [datas, setDatas] = useState<any>({
    content: [],
    sumStatus: {
      approved: 0,
      pending: 0,
      invalidData: 0,
      denied: 0
    }
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
    moment
    const dataRes = await axios.post(`http://localhost:8080/api/lots/search/dataresult`, request);
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

  const dataInvoiceTable = batchDate.map((data) => {
    let sumDoc = 0,
      sumTotalDuty = 0,
      sumTotalDubDutyAmount = 0,
      sumTotalPayment = 0;

    return (
      <div>
        <div className="Batch shadow row space4 ">
          <p className="tab">Batch Date : {data}</p>
        </div>
        <table className="transaction-table">
          <thead>
            <tr>
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
          {grouped[data].map((lot: lotModel, i: number) => {
            console.log(lot);
            sumDoc += lot.totalDoc;
            sumTotalDuty += lot.totalDuty;
            sumTotalDubDutyAmount += lot.totalDubDutyAmount;
            sumTotalPayment += lot.totalPayment;

            return (
              <tbody>
                <tr>
                  <td >{i + 1}</td>
                  <td>{lot.name}</td>
                  <td>{lot.batchDate}</td>
                  <td>{lot.totalDoc}</td>
                  <td></td>
                  <td>{lot.totalDuty}</td>
                  <td>{lot.totalDubDutyAmount}</td>
                  <td>{lot.totalPayment}</td>
                  <td>{lot.ref1}</td>
                  <td>{lot.ref2}</td>
                  <td>
                    <p className={lot.approvalStatus}>{lot.approvalStatus}</p>
                  </td>
                  <td className="action">
                    {/* <Routes>
                      <Route path={`/${lot.name}`} element={<DetailCollection />} />
                    </Routes> */}
                    <NavLink to={`/${lot.name}?page=0`} end state={{ lot: lot }}>
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
                        <path fill="#489788" fill-rule="evenodd" d="M5 5h2v2H5z" />
                        <path
                          fill="#489788"
                          d="M14 1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 2v6h6V3h-6z"
                        />
                        <path fill="#489788" fill-rule="evenodd" d="M17 5h2v2h-2z" />
                        <path
                          fill="#489788"
                          d="M2 13h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zm1 2v6h6v-6H3z"
                        />
                        <path fill="#489788" fill-rule="evenodd" d="M5 17h2v2H5z" />
                        <path
                          fill="#489788"
                          d="M23 19h-4v4h-5a1 1 0 0 1-1-1v-8v5h2v2h2v-6h-2v-2h-1h3v2h2v2h2v-4h1a1 1 0 0 1 1 1v5zm0 2v1a1 1 0 0 1-1 1h-1v-2h2z"
                        />
                      </svg>
                    </NavLink>
                  </td>
                  <td className="action">
                    {/* <Routes>
                      <Route path={`/${lot.name}`} element={<DetailCollection />} />
                    </Routes> */}
                    <NavLink to={`/${lot.name}?page=0`} end state={{ lot: lot }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#489788"
                          d="M13 16H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Zm-4-6h2a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Zm12 2h-3V3a1 1 0 0 0-.5-.87a1 1 0 0 0-1 0l-3 1.72l-3-1.72a1 1 0 0 0-1 0l-3 1.72l-3-1.72a1 1 0 0 0-1 0A1 1 0 0 0 2 3v16a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1ZM5 20a1 1 0 0 1-1-1V4.73l2 1.14a1.08 1.08 0 0 0 1 0l3-1.72l3 1.72a1.08 1.08 0 0 0 1 0l2-1.14V19a3 3 0 0 0 .18 1Zm15-1a1 1 0 0 1-2 0v-5h2Zm-7-7H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"
                        />
                      </svg>
                    </NavLink>
                  </td>
                  <td className="action">
                    {/* <Routes>
                      <Route path={`/${lot.name}`} element={<DetailCollection />} />
                    </Routes> */}
                    <NavLink to={`/${lot.name}?page=0`} end state={{ lot: lot }}>
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
                    </NavLink>
                  </td>
                </tr>
              </tbody>
            );
          })}
          <tfoot>
            <tr>
              <th className="ltb">Total</th>
              <th className="ltb"></th>
              <th className="ltb"></th>
              <th className="ltb"></th>
              <th className="ltb">{sumDoc}</th>
              <th className="ltb">{sumTotalDuty}</th>
              <th className="ltb">{sumTotalDubDutyAmount}</th>
              <th className="ltb">{sumTotalPayment}</th>
              <th className="ltb"></th>
              <th className="ltb"></th>
              <th className="ltb"></th>
              <th className="ltb"></th>
              <th className="ltb"></th>
              <th className="ltb"></th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  });

  return (
    <div className="space2">
      <div className="title spaceTitle">
        <div className="line"></div>
        <div>Invoice Payment</div>
      </div>

      <div className="SearchBar shadow  row btw spaceTitle">
        <div className="FilterButon">
          <button className="BatchDate button1">
            <div className="row">
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
            <div className="line2"></div>
          </button>

          <button className="LotName button1">
            <div className="row ">
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
            <div className="line2"></div>
          </button>
        </div>

        <button
          className="SearchButton"
          onClick={(e) => onSearch(e, { batchDate: startDate === null ? "" : moment(startDate).format('DD/MM/yyyy').toString(), lotName: lotName.lotNameInput })}
        >
          <div className="row ">
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
            <div className="space5">Search</div>
          </div>
        </button>
      </div>

      <div className="Transection">
        <div className="BatchBar shadow ">
          <div className="space3 ">
            <div className="filter spaceTitle2">
              <Link className="button button:hover black active" to="/invoice/all">
                All
              </Link>
              <Link className="button button:hover black" to="/lots/approved">
                <p className="row ">
                  Approved
                  <p className="green">{datas.sumStatus.approved}</p>
                </p>
              </Link>

              <Link className="button button:hover black" to="/lots/pending">
                <p className="row">
                  Pending
                  <p className="yellow">{datas.sumStatus.pending}</p>
                </p>
              </Link>
            </div>
            <div >
              <table>{dataInvoiceTable}</table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
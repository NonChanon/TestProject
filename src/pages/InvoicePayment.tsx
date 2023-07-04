import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PopupButt from "../components/PopupButt";
import style from "./InvoicePayment.module.css";
import ImageUpload from "../components/ImageUpload";

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

export default function InvoicePayment() {
  const [datas, setDatas] = useState<any>({
    content: [],
    sumIVStatus: {
      approved: 0,
      pending: 0,
    }
  });
  const [startDate = null, setStartDate] = useState<Date | null>();
  const [lotName, setLotName] = useState({
    lotNameInput: "",
  });
  const [tab, setTab] = useState("all");

  const path = useLocation().pathname;
  console.log("path = " + path);
  console.log(useLocation());

  let grouped = datas;

  const loadDatas = async () => {
    const dataRes = await axios.get(`http://localhost:8080/api/invoice/all`);
    setDatas(dataRes.data);
    console.log("getData is : " + dataRes.data);
  };

  const loadFilterDatas = async (filter: string) => {
    const dataRes = await axios.get(`http://localhost:8080/api${filter}`);
    setDatas(dataRes.data);
    console.log("getData is : " + dataRes.data);
  };

  const onSearch = async (e: React.MouseEvent, request: object) => {
    e.preventDefault();
    moment
    const dataRes = await axios.post(`http://localhost:8080/api/lots/search/iv`, request);
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

      <div className={`SearchBar shadow ${style.row} ${style.btw} ${style.spaceTitle}`}>
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
          onClick={(e) => onSearch(e, { batchDate: startDate === null ? "" : moment(startDate).format('DD/MM/yyyy').toString(), lotName: lotName.lotNameInput })}
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

      <div className={`Transaction`}>
        <div className={`BatchBar shadow`}>
          <div className={`${style.space3}`}>
            <div className={`${style.filter} ${style.spaceTitle2}`}>
              <button
                className={tab === 'all' ? `${style.filterButtonActive}` : `${style.filterButton}`}
                onClick={() => {
                  setTab("all");
                  loadFilterDatas("/invoice/all");
                }}>
                <p style={{ padding: "3px 8px 3px 8px" }}>
                  All
                </p>
              </button>
              <button
                className={tab === 'approved' ? `${style.filterButtonActive}` : `${style.filterButton}`}
                onClick={() => {
                  setTab("approved");
                  loadFilterDatas("/invoice/approved");
                }}
              >
                <p className={`${style.row}`}>
                  Approved
                  <p className={`${style.green}`}>{datas.sumIVStatus.approved}</p>
                </p>
              </button>

              <button
                className={tab === 'pending' ? `${style.filterButtonActive}` : `${style.filterButton}`}
                onClick={() => {
                  setTab("pending");
                  loadFilterDatas("/invoice/pending");
                }}
              >
                <p className={`${style.row}`}>
                  Pending
                  <p className={`${style.yellow}`}>{datas.sumIVStatus.pending}</p>
                </p>
              </button>
            </div>
            {datas.content.length > 0 ? (
              <div>
                <div className={`${style.Table} ${style.top}`}>
                  <table className={`${style.transactionTable}`}>
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
                    {datas.content.map((lot: lotModel, i: number) => {
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
                            <td>{lot.batchTime}</td>
                            <td>{lot.totalDoc}</td>
                            <td>{lot.totalDuty}</td>
                            <td>{lot.totalDubDutyAmount}</td>
                            <td>{lot.totalPayment}</td>
                            <td>{lot.ref1}</td>
                            <td>{lot.ref2}</td>
                            <td>
                              <p className={lot.paymentStatus}>{lot.paymentStatus}</p>
                            </td>
                            <td >
                              <PopupButt />
                            </td>
                            <td >
                              <PopupButt />
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
                        <th className={`${style.ltb}`}>Total</th>
                        <th className={`${style.ltb}`}></th>
                        <th className={`${style.ltb}`}></th>
                        <th className={`${style.ltb}`}></th>
                        <th className={`${style.ltb}`}>{sumDoc}</th>
                        <th className={`${style.ltb}`}>{sumTotalDuty}</th>
                        <th className={`${style.ltb}`}>{sumTotalDubDutyAmount}</th>
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
              </div>
            ) : undefined}

            {/* <table>{dataInvoiceTable}</table> */}
          </div>
        </div>
      </div>
    </div>
  );
}
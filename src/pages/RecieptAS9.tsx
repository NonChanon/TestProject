import React, { MouseEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import style from "../pages/RecieptAS9.module.css";
import axios from "axios";
import moment from "moment";
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
    const dataRes = await axios.get(`http://localhost:8080/api/invoice/approved`);
    setDatas(dataRes.data);
    console.log("getData is : " + dataRes.data);
  };



  const onSearch = async (e: MouseEvent, request: object) => {
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
                  <td>{lot.batchTime}</td>
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



  return (
    <div className={`${style.space2}`}>
      <div className={`${style.title} ${style.spaceTitle}`}>
        <div className={`${style.line}`}></div>
        <div>Reciept & AS9</div>
      </div>

      <div className={`shadow ${style.row} ${style.btw} ${style.spaceTitle}`}>
        <div className="FilterButon">

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
                placeholder="InstInfo ID"
                onChange={(e) => updateLotNameInput(e)}
              />
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


            <div>
              <table>{dataRecAS9Table}</table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

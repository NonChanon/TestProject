import "./DataResult.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

interface lotModel {
  name: string;
  totalDoc: number;
  batchDate: string;
  approvalStatus: string;
  approvedBy: string;
  totalDuty: number;
  totalDubDutyAmount: number;
  totalPayment: number;
}

export default function DataResult() {
  const [datas, setDatas] = useState([]);

  const path = useLocation().pathname;
  console.log("path = " + path);
  console.log(useLocation());

  let sumApproved = 0,
    sumPending = 0,
    sumInvalidData = 0,
    sumDenied = 0;

  let grouped = datas;

  const loadDatas = async () => {
    const dataRes = await axios.get(`http://localhost:8080/api${path}`);
    setDatas(dataRes.data);
    console.log(dataRes.data);
  };

  if (datas.length > 0) {
    grouped = datas.reduce((acc: any, obj: lotModel) => {
      console.log("Acc ======>", acc);
      const key: string = obj.batchDate;
      acc[key] = acc[key] || [];
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const batchDate = Object.keys(grouped);
  console.log(Object.keys(grouped));

  useEffect(() => {
    console.log("Trigger use Effect");
    loadDatas();
  }, [useLocation().key]);

  const overviewTable = batchDate.map((data) => {
    let sumDoc = 0,
      sumTotalDuty = 0,
      sumTotalDubDutyAmount = 0,
      sumTotalPayment = 0;

    return (
      <div>
        <div className="Batch shadow row space4 ">
          <p className="tab">Batch Date : {data}</p>
          {/* <div className="tab line3"></div>
          <p className="tab">Batch Time : {data.batchTime}</p> */}
        </div>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Lot Name</th>
              <th>Total Doc</th>
              <th>Last Update Date</th>
              <th>Approval Status</th>
              <th>Approved By</th>
              <th>Total Duty</th>
              <th>TotalDubDutyAmount</th>
              <th>Total Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          {grouped[data].map((lot: lotModel, i: number) => {
            console.log(lot);
            sumTotalDuty += lot.totalDuty;
            sumTotalDubDutyAmount += lot.totalDubDutyAmount;
            sumTotalPayment += lot.totalPayment;
            switch (lot.approvalStatus) {
              case "Approved":
                sumApproved += 1;
                break;
              case "Pending":
                sumPending += 1;
                break;
              case "Invalid Data":
                sumInvalidData += 1;
                break;
              case "Denied":
                sumDenied += 1;
                break;
            }
            return (
              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  <td>{lot.name}</td>
                  <td>{lot.totalDoc}</td>
                  <td>{lot.batchDate}</td>
                  <td>
                    <p className={lot.approvalStatus}>{lot.approvalStatus}</p>
                  </td>
                  <td>{lot.approvedBy}</td>
                  <td>{lot.totalDuty}</td>
                  <td>{lot.totalDubDutyAmount}</td>
                  <td>{lot.totalPayment}</td>
                  <td className="action">
                    {/* <Routes>
                      <Route path={`/${lot.name}`} element={<DetailCollection />} />
                    </Routes> */}
                    <Link to={`/${lot.name}`} state={{ lot: lot }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          fill="#535353"
                          d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm376 116c-119.3 0-216 96.7-216 216s96.7 216 216 216s216-96.7 216-216s-96.7-216-216-216zm107.5 323.5C750.8 868.2 712.6 884 672 884s-78.8-15.8-107.5-44.5C535.8 810.8 520 772.6 520 732s15.8-78.8 44.5-107.5C593.2 595.8 631.4 580 672 580s78.8 15.8 107.5 44.5C808.2 653.2 824 691.4 824 732s-15.8 78.8-44.5 107.5zM761 656h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8l-23.1-31.9a7.92 7.92 0 0 0-6.5-3.3H573c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.9-5.3.1-12.7-6.4-12.7zM440 852H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
          <tfoot>
            <tr>
              <th className="ltb">Total</th>
              <th className="ltb"></th>
              <th className="ltb">{sumDoc}</th>
              <th className="ltb"></th>
              <th className="ltb"></th>
              <th className="ltb"></th>
              <th className="ltb">{sumTotalDuty}</th>
              <th className="ltb">{sumTotalDubDutyAmount}</th>
              <th className="ltb">{sumTotalPayment}</th>
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
        <div>Data Result Correction</div>
      </div>

      <div className="shadow row btw spaceTitle">
        <div>
          <button className="BatchDate button1">
            <div className="row">
              <div className="space">Batch Date</div>
              <svg
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
              <div className="space">Lot Name</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  d="M8 14q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm4 0q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm4 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Z"
                />
              </svg>
            </div>
            <div className="line2"></div>
          </button>
        </div>

        <button className="SearchButton">
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

      <div className="Transaction">
        <div className="BatchBar shadow ">
          <div className="space3 ">
            <div className="filter spaceTitle2">
              <Link className="button button:hover black active" to="/lots/all">
                All
              </Link>
              <Link className="button button:hover black" to="/lots/approved">
                <p className="row ">
                  Approved
                  <p className="green">{sumApproved}</p>
                </p>
              </Link>
              {/* <button className="button button:hover black">
                  <p className="row ">
                    Approved
                    <p className="green">{sumApproved}</p>
                  </p>
                </button> */}
              <Link className="button button:hover black" to="/lots/pending">
                <p className="row">
                  Pending
                  <p className="yellow">{sumPending}</p>
                </p>
              </Link>
              <Link
                className="button button:hover black"
                to="/lots/invaliddata"
              >
                <p className="row">
                  Invalid Data
                  <p className="red">{sumInvalidData}</p>
                </p>
              </Link>
              <Link className="button button:hover black" to="/lots/denied">
                <p className="row ">
                  Denied
                  <p className="gray">{sumDenied}</p>
                </p>
              </Link>
            </div>
            {overviewTable}
          </div>
        </div>
      </div>
    </div>
  );
}

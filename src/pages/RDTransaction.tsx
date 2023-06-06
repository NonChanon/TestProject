import React from "react";
import "./RDTransaction.css";
import DataRD from "./DataRD";

export default function RDTransaction() {
  const dataRDTable = DataRD.map((data) => {
    const RDStatus = data.rd_status;
    let display;
    if(RDStatus != 0) { display = <p className='Fail'> Fail ({data.rd_status}) </p> }
    else { display = <p className='Success'> Success </p>
  }
    return (
      <tr>
        <td>1</td>
        <td>{data.lot_name}</td>
        <td>{data.batch_date}</td>
        <td>{data.batch_time}</td>
        <td>{data.send_date}</td>
        <td>{display}</td>
        <td>{data.total_duty}</td>
        <td>{data.total_dub}</td>
        <td>{data.total_payment}</td>
        <td>
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
  });

  return (
    <div className="space2">
      <div className="title spaceTitle">
        <div className="line"></div>
        <div>RD Transaction</div>
      </div>

      <div className="SearchBar shadow  row btw spaceTitle">
        <div className="FilterButon">
          <button className="BatchDate button1">
            <div className="row ">
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

      <div className="Transection">
        <div className="BatchBar shadow ">
          <div className="space3 ">
            <div className="filter spaceTitle2">
              <button className="button button:hover black active">All</button>
              <button className="button button:hover black ">
                <p className="row ">
                  Success
                  <p className="green">8</p>
                </p>
              </button>

              <button className="button button:hover black ">
                <p className="row">
                  Fail
                  <p className="red">2</p>
                </p>
              </button>
            </div>

            <div className="Batch  shadow row space4 ">
              <p className="tab">Batch Date : 31/10/2022</p>
              <div className="tab line3"></div>
              <p className="tab">Batch Time : 12:11</p>
            </div>

            <div className="Table top">
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
                {/* <tr>
                  <td>1</td>
                  <td>lot_14</td>
                  <td>31/10/2022</td>
                  <td>12:00</td>
                  <td>31/10/2022 15:00</td>
                  <td>
                    <p className="red1">Fail (4)</p>
                  </td>
                  <td>2,000</td>
                  <td>0</td>
                  <td>2,000</td>
                  <td>
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
                <tr>
                  <td>2</td>
                  <td>lot_13</td>
                  <td>31/10/2022</td>
                  <td>12:00</td>
                  <td>31/10/2022 15:00</td>
                  <td>
                    <p className="green1">Success</p>
                  </td>
                  <td>2,000</td>
                  <td>0</td>
                  <td>2,000</td>
                  <td>
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
                <tr>
                  <td>3</td>
                  <td>lot_12</td>
                  <td>31/10/2022</td>
                  <td>12:00</td>
                  <td>31/10/2022 15:00</td>
                  <td>
                    <p className="red1">Fail (9)</p>
                  </td>
                  <td>2,000</td>
                  <td>0</td>
                  <td>2,000</td>
                  <td>
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
                </tr> */}
                {dataRDTable}
                <tr>
                  <td className="ltb">Total</td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb">6,000</td>
                  <td className="ltb">0</td>
                  <td className="ltb">6,000</td>
                  <td className="ltb"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

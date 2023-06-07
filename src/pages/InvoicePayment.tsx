import React from "react";

import DataInvoice from "./DataInvoice";

export const InvoicePayment = () => {
  const dataInvoiceTable = DataInvoice.map((data, i) => {
    return (
      <tr>
        <td>{i+1}</td>
        <td>{data.lot_name}</td>
        <td>{data.batch_date}</td>
        <td>{data.batch_time}</td>
        <td>{data.total_docs}</td>
        <td>{data.total_duty}</td>
        <td>{data.total_dub}</td>
        <td>{data.total_payment}</td>
        <td>{data.ref1}</td>
        <td>{data.ref2}</td>
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
        <td>
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
        </td>
        <td>
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
        </td>
        <td>
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
        </td>
      </tr>
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
              <button className="button button:hover black">
                <p className="row ">
                  Success
                  <p className="green">230</p>
                </p>
              </button>
              <button className="button button:hover black">
                <p className="row">
                  Pending
                  <p className="yellow">18</p>
                </p>
              </button>
            </div>

            <div className="Table top">
              <table>
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
              {dataInvoiceTable}
                <tr>
                  <td className="ltb">Total</td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb">6,000</td>
                  <td className="ltb">0</td>
                  <td className="ltb">6,000</td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import "./RecieptAS9.css";

export default function RecieptAS9() {
  return (
    <div className="space2">
      <div className="title spaceTitle">
        <div className="line"></div>
        <div>Reciept & AS9</div>
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
          <div className=" ">
            <div className="Table top">
              <table>
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
                <tr>
                  <td>1</td>
                  <td>lot_14</td>
                  <td>20</td>
                  <td>31/10/2022</td>
                  <td>12:00</td>
                  <td>2562/10</td>
                  <td>1102918928918</td>
                  <td>2,000</td>
                  <td>
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
                  </td>
                  <td>
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
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>lot_14</td>
                  <td>20</td>
                  <td>31/10/2022</td>
                  <td>12:00</td>
                  <td>2562/10</td>
                  <td>1102918928918</td>
                  <td>2,000</td>
                  <td>
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
                  </td>
                  <td>
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
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>lot_14</td>
                  <td>20</td>
                  <td>31/10/2022</td>
                  <td>12:00</td>
                  <td>2562/10</td>
                  <td>1102918928918</td>
                  <td>2,000</td>
                  <td>
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
                  </td>
                  <td>
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
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>lot_14</td>
                  <td>20</td>
                  <td>31/10/2022</td>
                  <td>12:00</td>
                  <td>2562/10</td>
                  <td>1102918928918</td>
                  <td>2,000</td>
                  <td>
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
                  </td>
                  <td>
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
                  </td>
                </tr>
                <tr>
                  <td className="ltb">Total</td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb"></td>
                  <td className="ltb">6,000</td>
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
}

// import { useState } from "react";
// import DatePicker from "react-datepicker";
// import moment from "moment";
// import axios from "axios";

// import style from "./MyDatePicker.module.css";

// export const MyDatePicker = () => {
//     const [datas, setDatas] = useState<any>({
//         content: [],
//         sumStatus: {
//             approved: 0,
//             pending: 0,
//             invalidData: 0,
//             denied: 0
//         }
//     });
//     const [startDate, setStartDate] = useState<Date | null>();
//     const [lotName, setLotName] = useState({
//         lotNameInput: "",
//     });

//     const onSearch = async (e:React.MouseEvent, request:object) => {
//         e.preventDefault();
//         moment
//         const dataRes = await axios.post(`http://localhost:8080/api/lots/search/dataresult`, request);
//         setDatas(dataRes.data);
//         console.log("search data is " + dataRes.data);
//     };

//     const updateLotNameInput = (e: { target: { name: any; value: any } }) => {
//         console.log(e.target.name);
//         setLotName({
//             ...lotName,
//             [e.target.name]: e.target.value,
//         });
//         console.log(lotName.lotNameInput);
//     };
//     return (
//         <div className="shadow row btw spaceTitle">
//             <div>
//                 <button className="BatchDate button1">
//                     <div className="row">
//                         <DatePicker
//                             id="batchDate"
//                             dateFormat="dd/MM/yyy"
//                             selected={startDate}
//                             onChange={(date: Date) => {
//                                 setStartDate(date);
//                                 console.log("Selected date is : " + date.toLocaleString());
//                             }}
//                             isClearable
//                             placeholderText="Batch Date"
//                             className="calendarDate"
//                         />
//                         <svg
//                             style={{ margin: "0px" }}
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="20"
//                             height="20"
//                             viewBox="0 0 24 24"
//                         >
//                             <path
//                                 fill="#7F7F7F"
//                                 d="M8 14q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm4 0q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm4 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Z"
//                             />
//                         </svg>
//                     </div>
//                     <div className="line2"></div>
//                 </button>

//                 <button className="LotName button1">
//                     <div className="row ">
//                         <input
//                             name="lotNameInput"
//                             className="form-control"
//                             style={{
//                                 height: "100%",
//                                 border: "0",
//                                 fontSize: "14px",
//                                 fontFamily: "'Rubik', sans-serif",
//                                 margin: "0",
//                                 padding: "5px",
//                                 boxSizing: "border-box",
//                             }}
//                             placeholder="Lot Name"
//                             onChange={(e) => updateLotNameInput(e)}
//                         />
//                     </div>
//                     <div className="line2"></div>
//                 </button>
//             </div>

//             <button
//                 className="SearchButton"
//                 onClick={(e) => onSearch(e, { batchDate: startDate === null ? "" : moment(startDate).format('DD/MM/yyyy').toString(), lotName: lotName.lotNameInput })}
//             >
//                 <div className="row ">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="22"
//                         height="22"
//                         viewBox="0 0 22 22"
//                     >
//                         <g
//                             fill="none"
//                             fill-rule="evenodd"
//                             stroke="currentColor"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                         >
//                             <circle cx="8.5" cy="8.5" r="5" />
//                             <path d="M17.571 17.5L12 12" />
//                         </g>
//                     </svg>
//                     <div className="space5">Search</div>
//                 </div>
//             </button>
//         </div>
//     );
// }
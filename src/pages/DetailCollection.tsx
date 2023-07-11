import { useEffect, useState } from "react";
import style from "./DetailCollection.module.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

interface customerModel {
  title: string;
  firstname: string;
  lastname: string;
  taxPayerId: string;
  instInfoId: string;
  totalDuty: number;
  totalDubDutyAmount: number;
  totalPayment: number;
  finalPaymentDate: string;
  completed: boolean;
  address: addressModel;
  contract: contractModel;
}

interface addressModel {
  village: string;
  addressNo: string;
  floor: string;
  villageNo: string;
  alley: string;
  street: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
}

interface contractModel {
  number: string;
  startDate: string;
  endDate: string;
  applicantId: string;
  branchNumber: string;
  branchType: string;
  relatedStatus: string;
}

interface dataModel {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  content: customerModel[];
  lot: lotModel;
}

export default function DetailCollection() {
  const [datas, setDatas] = useState<dataModel>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    content: [],
    lot: {
      name: "",
      totalDoc: 0,
      batchDate: "",
      approvalStatus: "",
      approvedBy: "",
      totalDuty: 0,
      totalDubDutyAmount: 0,
      totalPayment: 0,
    },
  });

  const [pageNo, setPageNo] = useState("0");

  const path = useLocation().pathname;
  const searchPath = useLocation().search;
  console.log("path = " + path);
  console.log("search path = " + searchPath);
  console.log(useLocation());
  console.log("lotname : " + path.split("/")[path.split("/").length - 1]);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const loadDatas = async () => {
    const dataRes = await axios.get(
      `http://localhost:8080/api/${path.split("/")[path.split("/").length - 1]}`
    );
    setDatas(dataRes.data);
    console.log("loaddata = " + dataRes.data);
  };

  const loadPageDatas = async (page: string) => {
    const dataRes = await axios.get(
      `http://localhost:8080/api/${
        path.split("/")[path.split("/").length - 1]
      }?page=${page}`
    );
    setDatas(dataRes.data);
    console.log("currentPage = " + dataRes.data.currentPage);
  };

  const onApprove = async (e: React.MouseEvent, status: object) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/${datas.lot.name}`, status);
    navigate("/batchdataresult");
    console.log("change status!");
  };

  useEffect(() => {
    console.log("detail trigger");
    loadDatas();
  }, [useLocation().key]);

  console.log(localStorage.user_name);

  function renderPageNumber() {
    const list = [];
    if (datas.totalPages > 1) {
      list.push(
        <button
          onClick={() => {
            setPageNo(`${datas.currentPage == 0 ? 0 : datas.currentPage - 1}`);
            loadPageDatas(
              `${datas.currentPage == 0 ? 0 : datas.currentPage - 1}`
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 2 16 16"
          >
            <g transform="translate(24 0) scale(-1 1)">
              <path
                fill="none"
                stroke="#489788"
                stroke-width="2"
                d="m9 6l6 6l-6 6"
              />
            </g>
          </svg>
        </button>
      );
      for (let i = 0; i < datas.totalPages; i++) {
        list.push(
          <button
            onClick={() => {
              setPageNo(`${i}`);
              loadPageDatas(`${i}`);
            }}
            className={pageNo == `${i}` ? `${style.active}` : undefined}
          >
            {i + 1}
          </button>
        );
      }
      list.push(
        <button
          onClick={() => {
            setPageNo(
              `${
                datas.currentPage == datas.totalPages - 1
                  ? datas.totalPages - 1
                  : datas.currentPage + 1
              }`
            );
            loadPageDatas(
              `${
                datas.currentPage == datas.totalPages - 1
                  ? datas.totalPages - 1
                  : datas.currentPage + 1
              }`
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 2 16 16"
          >
            <path
              fill="none"
              stroke="#489788"
              stroke-width="2"
              d="m9 6l6 6l-6 6"
            />
          </svg>
        </button>
      );
    }
    return <div>{list}</div>;
  }

  return (
    <div className={`${style.space2}`}>
      <div className={`${style.title} ${style.spaceTitle}`}>
        <div className={`${style.line}`}></div>
        <div>Detail Collection</div>
      </div>

      <div className="Transection">
        <div className="BatchBar shadow">
          <div className={`${style.space3}`}>
            <div
              className="Batch shadow"
              style={{
                position: "relative",
                padding: "15px 20px 15px 30px",
                color: "#535353",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              <div
                className={`${style.row} ${style.btw}`}
                style={{ marginBottom: "25px" }}
              >
                <div className={`${style.row}`}>
                  <p style={{ position: "absolute", left: "30px" }}>
                    Batch Date : {datas.lot.batchDate}
                  </p>
                  <div
                    className={`${style.line3}`}
                    style={{ position: "absolute", left: "210px" }}
                  ></div>
                  <p style={{ position: "absolute", left: "235px" }}>
                    Lot Name : {datas.lot.name}
                  </p>
                </div>
                <p className={`${style.row}`}>
                  Status :
                  <div className={style[datas.lot.approvalStatus]}>
                    <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                      {datas.lot.approvalStatus}
                    </p>
                  </div>
                </p>
              </div>
              <div className={`${style.row}`} style={{ marginBottom: "15px" }}>
                <p style={{ position: "absolute", left: "30px" }}>
                  Total Duty : {datas.lot.totalDuty}
                </p>
                <div
                  className={`${style.line3}`}
                  style={{ position: "absolute", left: "210px" }}
                ></div>
                <p style={{ position: "absolute", left: "235px" }}>
                  Total Dub Duty Amount : {datas.lot.totalDubDutyAmount}
                </p>
                <div
                  className={`${style.line3}`}
                  style={{ position: "absolute", left: "480px" }}
                ></div>
                <p style={{ position: "absolute", left: "505px" }}>
                  Total Payment : {datas.lot.totalPayment}
                </p>
              </div>
            </div>

            <div className={`${style.top}`}>
              <table>
                <thead>
                  <tr>
                    <th>
                      <div>
                        <div className="iconSize" onClick={toggleModal}>
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
                            <path
                              fill="#489788"
                              fill-rule="evenodd"
                              d="M5 5h2v2H5z"
                            />
                            <path
                              fill="#489788"
                              d="M14 1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 2v6h6V3h-6z"
                            />
                            <path
                              fill="#489788"
                              fill-rule="evenodd"
                              d="M17 5h2v2h-2z"
                            />
                            <path
                              fill="#489788"
                              d="M2 13h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zm1 2v6h6v-6H3z"
                            />
                            <path
                              fill="#489788"
                              fill-rule="evenodd"
                              d="M5 17h2v2H5z"
                            />
                            <path
                              fill="#489788"
                              d="M23 19h-4v4h-5a1 1 0 0 1-1-1v-8v5h2v2h2v-6h-2v-2h-1h3v2h2v2h2v-4h1a1 1 0 0 1 1 1v5zm0 2v1a1 1 0 0 1-1 1h-1v-2h2z"
                            />
                          </svg>
                        </div>

                        {isOpen && (
                          <div className="bgFade">
                            <div className="a">
                              <div className="titleBlock">
                                <p className="popupTitle">QR CODE</p>
                                <div onClick={toggleModal} className="exit">
                                  X
                                </div>
                              </div>
                              {/* <img src={pics} /> */}
                              {/* <input type="file" /> */}

                              <div className="doneButt" onClick={toggleModal}>
                                DONE
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </th>
                    <th>InstInfo ID</th>
                    <th>TaxPayer ID</th>
                    <th>Name</th>
                    <th>Total Duty</th>
                    <th>TotalDubDutyAmount</th>
                    <th>Total Payment</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                {datas.content.map((customer: customerModel, i: number) => {
                  return (
                    <tbody>
                      <tr>
                        <td width="5%">{i + 1}</td>
                        <td width="15%">{customer.instInfoId}</td>
                        <td width="15%">{customer.taxPayerId}</td>
                        <td width="15%">{`${customer.firstname} ${customer.lastname}`}</td>
                        <td width="15%">{customer.totalDuty}</td>
                        <td width="15%">{customer.totalDubDutyAmount}</td>
                        <td width="15%">{customer.totalPayment}</td>
                        <td style={{ cursor: "pointer" }} width="5%">
                          <Link
                            to={`/batchdataresult/${datas.lot.name}/${customer.taxPayerId}/edit`}
                            state={{ lot: datas.lot, customer: customer }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="21"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="none"
                                stroke="#393939"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8"
                              />
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>

            <div className={`page&butt ${style.row} ${style.top2}`}>
              <div className={`${style.pagination} ${style.end}`}>
                {renderPageNumber()}
              </div>
              <div className={`${style.ButtonAction}`}>
                <button
                  onClick={(e) =>
                    onApprove(e, {
                      approvalStatus: "Approved",
                      approvalBy: localStorage.user_name,
                    })
                  }
                  className={`${style.apbutt} ${style.tab2}`}
                >
                  Approve
                </button>
                <button
                  onClick={(e) => onApprove(e, { approvalStatus: "Denied" })}
                  className={`${style.dnbutt}`}
                >
                  Denied
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

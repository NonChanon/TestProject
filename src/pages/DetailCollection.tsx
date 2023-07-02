import { MouseEvent, useEffect, useState } from "react";
import style from "./DetailCollection.module.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export interface customerModel {
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

export interface addressModel {
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

export interface contractModel {
  number: string;
  startDate: string;
  endDate: string;
  applicantId: string;
  branchNumber: string;
  branchType: string;
  relatedStatus: string;
}

export default function DetailCollection() {
  const [datas, setDatas] = useState<any>({
    totalItems: Number,
    totalPages: Number,
    currentPage: Number,
    content: [],
  });

  const path = useLocation().pathname;
  const searchPath = useLocation().search;
  console.log("path = " + path);
  console.log("search path = " + searchPath);
  console.log(useLocation());

  const { state } = useLocation();
  console.log("batchdate = " + state.lot.batchDate);
  const navigate = useNavigate();

  const onApprove = async (e: MouseEvent, status: object) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api${path}`, status);
    navigate("/lots/all");
    console.log("change status!");
  };

  const loadDatas = async () => {
    const dataRes = await axios.get(
      `http://localhost:8080/api${path}${searchPath}`
    );
    setDatas(dataRes.data);
    console.log("loaddata = " + dataRes.data);
  };

  useEffect(() => {
    console.log("detail trigger");
    loadDatas();
  }, [useLocation().key]);

  function renderPageNumber() {
    const list = [];
    if (datas.totalPages > 1) {
      list.push(
        <Link to={`${path}?page=${datas.currentPage == 0 ? 0 : datas.currentPage - 1}`} state={{ lot: state.lot }}>
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
        </Link>
      );
      for (let i = 0; i < datas.totalPages; i++) {
        const pagePath = `${path}?page=${i}`;
        const isActive = path + searchPath === pagePath;
        console.log("pagePath = " + pagePath);
        console.log("isActive = " + isActive);
        list.push(
          <Link
            to={pagePath}
            className={isActive ? `${style.active}` : undefined}
            state={{ lot: state.lot }}
          >
            {i + 1}
          </Link>
        );
      }
      list.push(
        <Link to={`${path}?page=${datas.currentPage == datas.totalPages - 1 ? datas.totalPages - 1 : datas.currentPage + 1}` } state={{ lot: state.lot }}>
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
        </Link>
      );
    }
    return <label>{list}</label>;
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
                    Batch Date : {state.lot.batchDate}
                  </p>
                  <div
                    className={`${style.line3}`}
                    style={{ position: "absolute", left: "210px" }}
                  ></div>
                  <p style={{ position: "absolute", left: "235px" }}>
                    Lot Name : {state.lot.name}
                  </p>
                </div>
                <p className={`${style.row}`}>
                  Status :
                  <div className={style[state.lot.approvalStatus]}>
                    <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                      {state.lot.approvalStatus}
                    </p>
                  </div>
                </p>
              </div>
              <div className={`${style.row}`} style={{ marginBottom: "15px" }}>
                <p style={{ position: "absolute", left: "30px" }}>
                  Total Duty : {state.lot.totalDuty}
                </p>
                <div
                  className={`${style.line3}`}
                  style={{ position: "absolute", left: "210px" }}
                ></div>
                <p style={{ position: "absolute", left: "235px" }}>
                  Total Dub Duty Amount : {state.lot.totalDubDutyAmount}
                </p>
                <div
                  className={`${style.line3}`}
                  style={{ position: "absolute", left: "480px" }}
                ></div>
                <p style={{ position: "absolute", left: "505px" }}>
                  Total Payment : {state.lot.totalPayment}
                </p>
              </div>
            </div>

            <div className={`${style.top}`}>
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
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
                            to={`/${state.lot.name}/${customer.taxPayerId}/edit`}
                            state={{ lot: state.lot, customer: customer }}
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
                  onClick={(e) => onApprove(e, { approvalStatus: "Approved" })}
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

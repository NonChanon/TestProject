import { MouseEvent, useEffect, useState } from "react";
import "./DetailCollection.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface customerModel {

  instInfoId: string;
  taxPayerId: string;
  name: string;
  totalDuty: number;
  totalDubDutyAmount: number;
  totalPayment: number;

}

export default function DetailCollection() {
  const [datas, setDatas] = useState([]);

  const path = useLocation().pathname;
  console.log("path = " + path);
  console.log(useLocation());

  const { state } = useLocation();
  console.log("data = " + state.data.batchDate);
  const navigate = useNavigate();

  const onApprove = async (e:MouseEvent, status:object) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api${path}`, status);
    navigate(-1);
    console.log("change status!");
  }

  const loadDatas = async () => {
    const dataRes = await axios.get(`http://localhost:8080/api${path}`);
    setDatas(dataRes.data);
  };

  useEffect(() => {
    console.log("detail trigger");
    loadDatas();
  }, []);

  return (
    <div className="space2">
      <div className="title spaceTitle">
        <div className="line"></div>
        <div>Detail Collection</div>
      </div>

      <div className="Transection">
        <div className="BatchBar shadow ">
          <div className="space3 ">
            <div className="Batch  shadow  space4">
              <div className="row spaceTitle btw">
                <div className="row">
                  <p className="tab">Batch Date : {state.data.batchDate}</p>
                  <div className="tab line3"></div>
                  <p className="tab">Lot Name : {state.data.name}</p>
                </div>
                <p className=" row">
                  Status :
                  <div className={state.data.approvalStatus}>
                    {state.data.approvalStatus}
                  </div>
                </p>
              </div>
              <div className="row ">
                <p className="tab1 ">Total Duty : {state.data.totalDuty}</p>
                <div className="tab line3"></div>
                <p className="tab">
                  Total Dub Duty Amount : {state.data.totalDubDutyAmount}
                </p>
                <div className="tab line3"></div>
                <p className="tab">Total Payment : {state.data.totalPayment}</p>
              </div>
            </div>

            <div className="top">
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
                {datas.map((customer: customerModel, i: number) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{i+1}</td>
                        <td>{customer.instInfoId}</td>
                        <td>{customer.taxPayerId}</td>
                        <td>{customer.name}</td>
                        <td>{customer.totalDuty}</td>
                        <td>{customer.totalDubDutyAmount}</td>
                        <td>{customer.totalPayment}</td>
                        <td style={{cursor:"pointer"}}>
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
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>

            <div className="page&butt row top2 ">
              <div className="pagination end">
                <a href="#">
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
                </a>
                <a href="#" className="active">
                  1
                </a>
                <a href="#">2</a>

                <a href="#">
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
                </a>
              </div>
              <div className="ButtonAction ">
                <button onClick={(e) => onApprove(e, {approvalStatus: "Approved"})} className="apbutt tab2">Approve</button>
                <button onClick={(e) => onApprove(e, {approvalStatus: "Denied"})} className="dnbutt">Denied</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

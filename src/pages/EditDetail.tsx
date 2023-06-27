import { useLocation, useNavigate } from "react-router-dom";
import style from "./EditDetail.module.css";
import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function EditDetail() {
  const { state } = useLocation();
  console.log(state);
  const [states, setStates] = useState(state);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const updateCustomer = (e: { target: { name: any; value: any } }) => {
    console.log(e.target.name);
    setStates({
      ...states,
      customer: {
        ...states.customer,
        [e.target.name]: e.target.value,
      },
    });
  };

  const updateAddress = (e: { target: { name: any; value: any } }) => {
    console.log(e.target.name);
    setStates({
      ...states,
      customer: {
        ...states.customer,
        address: {
          ...states.customer.address,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const updateContract = (e: { target: { name: any; value: any } }) => {
    console.log(e.target.name);
    setStates({
      ...states,
      customer: {
        ...states.customer,
        contract: {
          ...states.customer.contract,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  return (
    <div className={`${style.ttspace}`}>
      <div className={`${style.title}`}>
        <div className={`${style.ttline}`}></div>
        <div>Edit Detail</div>
      </div>

      <form className={`${style.content}`}>
        <div>
          <div className="Contract Information">
            <p className={`${style.tt}`}>Contract Information</p>
            <div className={`${style.gridContainer}`}>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Contract Number</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="number"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.contract.number}
                    onChange={(e) => updateContract(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Contract Start Date</p>
                <div className={`${style.inputDiv}`}>
                  <div>
                    <input
                      name="startDate"
                      type="text"
                      className={`${style.txt}`}
                      defaultValue={states.customer.contract.startDate}
                      onChange={(e) => updateContract(e)}
                    />
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 20 22"
                    >
                      <path
                        fill="#535353"
                        d="M8 14q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm4 0q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm4 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Contract End Date</p>
                <div className={`${style.inputDiv}`}>
                  <div>
                    <input
                      name="endDate"
                      type="text"
                      className={`${style.txt}`}
                      defaultValue={states.customer.contract.endDate}
                      onChange={(e) => updateContract(e)}
                    />
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 20 22"
                    >
                      <path
                        fill="#535353"
                        d="M8 14q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm4 0q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm4 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Information of the applicant">
            <p className={`${style.tt}`}>
              Information of the applicant for stamp duty
            </p>
            <div className={`${style.gridContainer}`}>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>
                  Identification number of the applicant for stamp duty
                </p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="applicantId"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.contract.applicantId}
                    onChange={(e) => updateContract(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Branch Number</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="branchNumber"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.contract.branchNumber}
                    onChange={(e) => updateContract(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Branch Type</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="branchType"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.contract.branchType}
                    onChange={(e) => updateContract(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Contract related Status</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="relatedStatus"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.contract.relatedStatus}
                    onChange={(e) => updateContract(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="Payment Details">
            <p className={`${style.tt}`}>Payment Details</p>
            <div className={`${style.gridContainer}`}>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Final Payment Date</p>
                <div className={`${style.inputDiv}`}>
                  <div>
                    <input
                      name="finalPaymentDate"
                      type="text"
                      className={`${style.txt}`}
                      defaultValue={states.customer.finalPaymentDate}
                      onChange={(e) => updateCustomer(e)}
                    />
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 20 22"
                    >
                      <path
                        fill="#535353"
                        d="M8 14q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm4 0q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm4 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Duty Amount</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="totalDuty"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.totalDuty}
                    onChange={(e) => updateCustomer(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Dub Duty Amount</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="totalDubDutyAmount"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.totalDubDutyAmount}
                    onChange={(e) => updateCustomer(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Total Amount</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="totalPayment"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.totalPayment}
                    onChange={(e) => updateCustomer(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="Contract Party Details">
            <p className={`${style.tt}`}>Contract Party Details</p>
            <div className={`${style.gridContainer}`}>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Title</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="title"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.title}
                    onChange={(e) => updateCustomer(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Firstname</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="firstname"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.firstname}
                    onChange={(e) => updateCustomer(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Lastname</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="lastname"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.lastname}
                    onChange={(e) => updateCustomer(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Village / Building</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="village"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.address.village}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <div className={`${style.minigrid}`}>
                  <p className={`${style.minitxtblk}`}>Address Number</p>
                  <div className={``}>
                    <input
                      name="addressNo"
                      type="text"
                      className={`${style.minitxt}`}
                      defaultValue={states.customer.address.addressNo}
                      onChange={(e) => updateAddress(e)}
                    />
                  </div>
                </div>
                <div className={`${style.minigrid}`}>
                  <p className={`${style.minitxtblk}`}>Floor</p>
                  <div className={``}>
                    <input
                      name="floor"
                      type="text"
                      className={`${style.minitxt}`}
                      defaultValue={states.customer.address.floor}
                      onChange={(e) => updateAddress(e)}
                    />
                  </div>
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Village Number</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="villageNo"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.address.villageNo}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Alley / Section</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="alley"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.address.alley}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Street</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="street"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.address.street}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Subdistrict</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="subDistrict"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.address.subDistrict}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>District</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="district"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.address.district}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Province</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="province"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.address.province}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Postal Code</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="postalCode"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.address.postalCode}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className={`${style.submitButton}`}
          style={{ marginRight: "5px" }}
          onClick={async (e) => {
            e.preventDefault();
            await axios.put(
              `http://localhost:8080/api${path}`,
              states.customer
            );
            navigate(-1);
          }}
          type="submit"
        >
          Submit
        </button>
        <button
          className={`${style.cancelButton}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type="submit"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

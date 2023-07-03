import { useLocation, useNavigate } from "react-router-dom";
import style from "./EditDetail.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import moment from "moment";

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

export default function EditDetail() {
  const [datas, setDatas] = useState<any>({
    title: "", firstname: "", lastname: "", taxPayerId: "", instInfoId: "",
    totalDuty: 0, totalDubDutyAmount: 0, totalPayment: 0, finalPaymentDate: "",
    address: {
      village: "", addressNo: "", floor: "", villageNo: "", alley: "",
      street: "", subDistrict: "", district: "", province: "", postalCode: "",
    },
    contract: {
      number: "", startDate: "", endDate: "", applicantId: "", branchNumber: "", relatedStatus: ""
    }
  });
  const { state } = useLocation();
  console.log(state);
  const [states, setStates] = useState(state);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [finalPaymentDate, setFinalPaymentDate] = useState<Date | null>();
  const [totalPayment, setTotalPayment] = useState({
    paymentAmount:
      states.customer.totalDuty + states.customer.totalDubDutyAmount,
  });
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const loadDatas = async () => {
    const dataRes = await axios.get(`http://localhost:8080/api${path.replace('/rd', '')}`);
    setDatas(dataRes.data);
    console.log("getEditData is : " + dataRes.data);
  };

  useEffect(() => {
    console.log("edit effect trigger");
    loadDatas();
  }, [useLocation().key])

  console.log(datas);

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

  console.log(datas.address.alley);

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
                <div 
                className={`${style.inputDiv}`}
                style={datas.contract.number === null || datas.contract.number === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}>
                  <input
                    name="number"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.contract.number}
                    onChange={(e) => updateContract(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Contract Start Date</p>
                <div 
                className={`${style.inputDiv}`}
                style={datas.contract.startDate === null || datas.contract.startDate === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <div>
                    <DatePicker
                      wrapperClassName={`${style.test}`}
                      name="startDate"
                      dateFormat="dd/MM/yyy"
                      selected={startDate}
                      onChange={(date: Date) => {
                        setStartDate(date);
                        setStates({
                          ...states,
                          customer: {
                            ...states.customer,
                            contract: {
                              ...states.customer.contract,
                              ["startDate"]: moment(date)
                                .format("DD/MM/yyyy")
                                .toString(),
                            },
                          },
                        });
                        console.log(
                          "Selected date is : " + date.toLocaleString()
                        );
                      }}
                      isClearable
                      placeholderText={datas.contract.startDate === null ? "Select Date" : datas.contract.startDate}
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
                <div 
                className={`${style.inputDiv}`}
                style={datas.contract.endDate === null || datas.contract.endDate === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <div>
                    <DatePicker
                      name="endDate"
                      wrapperClassName={`${style.test}`}
                      dateFormat="dd/MM/yyy"
                      selected={endDate}
                      onChange={(date: Date) => {
                        setEndDate(date);
                        setStates({
                          ...states,
                          customer: {
                            ...states.customer,
                            contract: {
                              ...states.customer.contract,
                              ["endDate"]: moment(date)
                                .format("DD/MM/yyyy")
                                .toString(),
                            },
                          },
                        });
                        console.log(
                          "Selected date is : " + date.toLocaleString()
                        );
                      }}
                      isClearable
                      placeholderText={datas.contract.endDate === null ? "Select Date" : datas.contract.endDate}
                      className="calendarDate"
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
                <div
                className={`${style.inputDiv}`}
                style={datas.contract.applicantId === null || datas.contract.applicantId === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="applicantId"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.contract.applicantId}
                    onChange={(e) => updateContract(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Branch Number</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.contract.branchNumber === null || datas.contract.branchNumber === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="branchNumber"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.contract.branchNumber}
                    onChange={(e) => updateContract(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Branch Type</p>
                <div
                    className={`${style.inputDiv}`}
                    style={datas.contract.branchType === null || datas.contract.branchType === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="branchType"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.contract.branchType}
                    onChange={(e) => updateContract(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Contract related Status</p>
                <div
                    className={`${style.inputDiv}`}
                    style={datas.contract.relatedStatus === null || datas.contract.relatedStatus === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}>
                  <input
                    name="relatedStatus"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.contract.relatedStatus}
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
                <div
                className={`${style.inputDiv}`}
                style={datas.finalPaymentDate === null || datas.finalPaymentDate === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <div>
                    <DatePicker
                      name="finalPaymentDate"
                      wrapperClassName={`${style.test}`}
                      dateFormat="dd/MM/yyy"
                      selected={finalPaymentDate}
                      onChange={(date: Date) => {
                        setFinalPaymentDate(date);
                        setStates({
                          ...states,
                          customer: {
                            ...states.customer,
                            ["finalPaymentDate"]: moment(date)
                              .format("DD/MM/yyyy")
                              .toString(),
                          },
                        });
                        console.log(
                          "Selected date is : " + date.toLocaleString()
                        );
                      }}
                      isClearable
                      placeholderText={datas.finalPaymentDate === null ? "Select Date" : datas.finalPaymentDate}
                      className={`${style.calendarDate}`}
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
                <div
                className={`${style.inputDiv}`}
                style={datas.totalDuty === null ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="totalDuty"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.totalDuty}
                    onChange={(e) => {
                      updateCustomer(e);
                      console.log(states);
                    }}
                    onBlur={() => {
                      console.log(
                        states.customer.totalDuty +
                          states.customer.totalDubDutyAmount
                      );
                      setTotalPayment({
                        ...totalPayment,
                        paymentAmount:
                          Number(states.customer.totalDuty) +
                          Number(states.customer.totalDubDutyAmount),
                      });
                    }}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Dub Duty Amount</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.totalDubDutyAmount === null ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="totalDubDutyAmount"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.totalDubDutyAmount}
                    onChange={(e) => {
                      updateCustomer(e);
                    }}
                    onBlur={() => {
                      setTotalPayment({
                        ...totalPayment,
                        paymentAmount:
                          Number(states.customer.totalDuty) +
                          Number(states.customer.totalDubDutyAmount),
                      });
                      console.log(states);
                    }}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Total Amount</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.totalAmount === null ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <div
                    className={`${style.txt}`}
                  >
                    {totalPayment.paymentAmount}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Contract Party Details">
            <p className={`${style.tt}`}>Contract Party Details</p>
            <div className={`${style.gridContainer}`}>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Title</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.title === null || datas.title === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="title"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.title}
                    onChange={(e) => updateCustomer(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Firstname</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.firstname === null || datas.firstname === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="firstname"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.firstname}
                    onChange={(e) => updateCustomer(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Lastname</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.lastname === null || datas.lastname === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="lastname"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.lastname}
                    onChange={(e) => updateCustomer(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Village / Building</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.village === null || datas.village === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="village"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.address.village}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <div className={`${style.minigrid}`}>
                  <p className={`${style.minitxtblk}`}>Address Number</p>
                  <div
                  style={datas.address.addressNo === null || datas.address.addressNo === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                  >
                    <input
                      name="addressNo"
                      type="text"
                      className={`${style.minitxt}`}
                      defaultValue={datas.address.addressNo}
                      onChange={(e) => updateAddress(e)}
                    />
                  </div>
                </div>
                <div className={`${style.minigrid}`}>
                  <p className={`${style.minitxtblk}`}>Floor</p>
                  <div
                  style={datas.address.floor === null || datas.address.floor === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                  >
                    <input
                      name="floor"
                      type="text"
                      className={`${style.minitxt}`}
                      defaultValue={datas.address.floor}
                      onChange={(e) => updateAddress(e)}
                    />
                  </div>
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Village Number</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.address.villageNo === null || datas.address.villageNo === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="villageNo"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.address.villageNo}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Alley / Section</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.address.alley === null || datas.address.alley === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="alley"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.address.alley}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Street</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.address.street === null || datas.address.street === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="street"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.address.street}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Subdistrict</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.address.subDistrict === null || datas.address.subDistrict === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="subDistrict"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.address.subDistrict}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>District</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.address.district === null || datas.address.district === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="district"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.address.district}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Province</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.address.province === null || datas.address.province === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="province"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.address.province}
                    onChange={(e) => updateAddress(e)}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Postal Code</p>
                <div
                className={`${style.inputDiv}`}
                style={datas.address.postalCode === null || datas.address.postalCode === '' ? {'borderColor': '#CA0700'} : {'borderColor': '#CECECE'}}
                >
                  <input
                    name="postalCode"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.address.postalCode}
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
              `http://localhost:8080/api${path.replace('/rd', '')}`,
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

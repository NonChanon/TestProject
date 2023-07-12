import { useLocation, useNavigate } from "react-router-dom";
import style from "./EditDetail.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Alert from '@mui/material/Alert'

import moment from "moment";
import { validContractNumber, validId, validNumberAndLetterAndSpace, validNumber, validPostalCode, validLetterAndSpace } from "../components/RegEx";

interface customerModel {
  title: string;
  firstname: string;
  lastname: string;
  taxPayerId: string;
  instInfoId: string;
  totalDuty: string;
  totalDubDutyAmount: string;
  totalPayment: string;
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

interface errModel {
  contractNumber: boolean;
  applicantId: boolean;
  branchNumber: boolean;
  totalDuty: boolean;
  totalDubDutyAmount: boolean;
  firstname: boolean;
  lastname: boolean;
  village: boolean;
  addressNo: boolean;
  floor: boolean;
  villageNo: boolean;
  alley: boolean;
  street: boolean;
  subDistrict: boolean;
  district: boolean;
  province: boolean;
  postalCode: boolean;
}

export default function EditDetail() {
  const [datas, setDatas] = useState<customerModel>({
    title: "",
    firstname: "",
    lastname: "",
    taxPayerId: "",
    instInfoId: "",
    totalDuty: "",
    totalDubDutyAmount: "",
    totalPayment: "",
    finalPaymentDate: "",
    completed: false,
    address: {
      village: "",
      addressNo: "",
      floor: "",
      villageNo: "",
      alley: "",
      street: "",
      subDistrict: "",
      district: "",
      province: "",
      postalCode: "",
    },
    contract: {
      number: "",
      startDate: "",
      endDate: "",
      applicantId: "",
      branchType: "",
      branchNumber: "",
      relatedStatus: "",
    },
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
  const [isOpen, setIsOpen] = useState(false);
  let initErr: errModel = {
    contractNumber: true,
    applicantId: true,
    branchNumber: true,
    totalDuty: true,
    totalDubDutyAmount: true,
    firstname: true,
    lastname: true,
    village: true,
    addressNo: true,
    floor: true,
    villageNo: true,
    alley: true,
    street: true,
    subDistrict: true,
    district: true,
    province: true,
    postalCode: true,
  };

  const validate = () => {
    validContractNumber.test(states.customer.contract.number) ? initErr.contractNumber = false : initErr.contractNumber = true;
    validId.test(states.customer.contract.applicantId) ? initErr.applicantId = false : initErr.applicantId = true;
    validNumber.test(states.customer.contract.branchNumber) ? initErr.branchNumber = false : initErr.branchNumber = true;
    validNumber.test(states.customer.totalDuty) ? initErr.totalDuty = false : initErr.totalDuty = true;
    validNumber.test(states.customer.totalDubDutyAmount) ? initErr.totalDubDutyAmount = false : initErr.totalDubDutyAmount = true;
    validLetterAndSpace.test(states.customer.firstname) ? initErr.firstname = false : initErr.firstname = true;
    validLetterAndSpace.test(states.customer.lastname) ? initErr.lastname = false : initErr.lastname = true;
    validNumberAndLetterAndSpace.test(states.customer.address.village) ? initErr.village = false : initErr.village = true;
    validNumber.test(states.customer.address.addressNo) ? initErr.addressNo = false : initErr.addressNo = true;
    validNumber.test(states.customer.address.floor) ? initErr.floor = false : initErr.floor = true;
    validNumber.test(states.customer.address.villageNo) ? initErr.villageNo = false : initErr.villageNo = true;
    validNumberAndLetterAndSpace.test(states.customer.address.alley) ? initErr.alley = false : initErr.alley = true;
    validNumberAndLetterAndSpace.test(states.customer.address.street) ? initErr.street = false : initErr.street = true;
    validNumberAndLetterAndSpace.test(states.customer.address.subDistrict) ? initErr.subDistrict = false : initErr.subDistrict = true;
    validNumberAndLetterAndSpace.test(states.customer.address.district) ? initErr.district = false : initErr.district = true;
    validLetterAndSpace.test(states.customer.address.province) ? initErr.province = false : initErr.province = true;
    validPostalCode.test(states.customer.address.postalCode) ? initErr.postalCode = false : initErr.postalCode = true;
    console.log(states.customer.address.street, validNumberAndLetterAndSpace.test(states.customer.address.street));
  }

  const warningInput = () => {
    let invalidInput: string[] = [];
    console.log(initErr);
    validate();
    Object.entries(initErr).map((input) => {
      if (input[1] === true) {
        invalidInput.push(input[0]);
      }
    });
    let message: string[] = [];
    invalidInput.forEach((key) => {
      switch (key) {
        case 'contractNumber':
          message.push('Please fill contract number correctly ex. th12345');
          break;
        case 'applicantId':
          message.push('Please fill Identification number correctly with 13 digits ex. 1234567890123');
          break;
        case 'branchNumber':
          message.push('Please fill Branch number with number only');
          break;
        case 'totalDuty':
          message.push('Please fill Duty Amount with number only');
          break;
        case 'totalDubDutyAmount':
          message.push('Please fill Dub Duty Amount with number only');
          break;
        case 'firstname':
          message.push('Please fill Firstname with letter only');
          break;
        case 'lastname':
          message.push('Please fill Lastname with letter only');
          break;
        case 'village':
          message.push('Please fill Village with letter only');
          break;
        case 'addressNo':
          message.push('Please fill Address Number with number only');
          break;
        case 'floor':
          message.push('Please fill Floor with number only');
          break;
        case 'villageNo':
          message.push('Please fill Village Number with number only');
          break;
        case 'alley':
          message.push('Please fill Alley with letter only');
          break;
        case 'street':
          message.push('Please fill Street with letter only');
          break;
        case 'subDistrict':
          message.push('Please fill Subdistrict with letter only');
          break;
        case 'district':
          message.push('Please fill District with letter only');
          break;
        case 'province':
          message.push('Please fill Province with letter only');
          break;
        case 'postalCode':
          message.push('Please fill Postal Code correctly with 5 digits ex.12345');
          break;
        default:
          break;
      }
    });
    console.log(message);
    return <Alert style={{ 'marginBottom': '10px' }} severity="warning">{message.map((detail) => {
      return (<p>{detail}</p>);
    })}</Alert>;
  }

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const loadDatas = async () => {
    const dataRes = await axios.get(
      `http://localhost:8080/api${path.replace("/batchdataresult", "")}`
    );
    setDatas(dataRes.data);
    console.log("getEditData is : " + dataRes.data);
  };

  useEffect(() => {
    console.log("edit effect trigger");
    loadDatas();
    validate();
    console.log(initErr);
  }, [useLocation().key]);

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

  return (
    <div className={`${style.ttspace}`}>
      <div className={`${style.title}`}>
        <div className={`${style.ttline}`}></div>
        <div>Edit Detail</div>
      </div>
      {isOpen && warningInput()}
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
                    defaultValue={datas.contract.number}
                    onChange={(e) => {
                      updateContract(e)
                      validContractNumber.test(e.target.value) ? initErr.contractNumber = false : initErr.contractNumber = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Contract Start Date</p>
                <div className={`${style.inputDiv}`}>
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
                      placeholderText={
                        datas.contract.startDate === null
                          ? "Select Date"
                          : datas.contract.startDate
                      }
                    />
                  </div>
                  <div>
                    <svg
                      className={`${style.svgEdit}`}
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
                      placeholderText={
                        datas.contract.endDate === null
                          ? "Select Date"
                          : datas.contract.endDate
                      }
                      className="calendarDate"
                    />
                  </div>
                  <div>
                    <svg
                      className={`${style.svgEdit}`}
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
                    defaultValue={datas.contract.applicantId}
                    onChange={(e) => {
                      updateContract(e)
                      validId.test(e.target.value) ? initErr.applicantId = false : initErr.applicantId = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
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
                    defaultValue={datas.contract.branchNumber}
                    onChange={(e) => {
                      updateContract(e)
                      validNumber.test(e.target.value) ? initErr.branchNumber = false : initErr.branchNumber = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
                  />
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Branch Type</p>
                <div
                  className={`${style.inputDiv}`}
                  style={{
                    height: "26px",
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <select
                    name="branchType"
                    id="customerContractBranchType"
                    style={{
                      height: "100%",
                      width: "90%",
                      border: "none",
                      display: "flex",
                      position: "absolute",
                      left: "8px",
                    }}
                    onChange={(e) => updateContract(e)}
                  >
                    {datas.contract.branchType === "" || datas.contract.branchType === null ? <option value="" selected disabled hidden>Choose here</option> : undefined}
                    {datas.contract.branchType === "Main" ? <option selected value="Main">Main</option> : <option value="Main">Main</option>}
                    {datas.contract.branchType === "Sub" ? <option selected value="Sub">Sub</option> : <option value="Sub">Sub</option>}
                    {datas.contract.branchType === "Cooperative" ? <option selected value="Cooperative">Cooperative</option> : <option value="Cooperative">Cooperative</option>}
                  </select>
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Contract related Status</p>
                <div
                  className={`${style.inputDiv}`}
                  style={{
                    height: "26px",
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <select
                    name="relatedStatus"
                    id="customerContractRelatedStatus"
                    style={{
                      height: "100%",
                      width: "90%",
                      border: "none",
                      display: "flex",
                      position: "absolute",
                      left: "8px",
                    }}
                    onChange={(e) => updateContract(e)}
                  >
                    {datas.contract.relatedStatus === "" || datas.contract.relatedStatus === null ? <option value="" selected disabled hidden>Choose here</option> : undefined}
                    {datas.contract.relatedStatus === "Lender" ? <option selected value="Lender">Lender</option> : <option value="Lender">Lender</option>}
                    {datas.contract.relatedStatus === "Borrower" ? <option selected value="Borrower">Borrower</option> : <option value="Borrower">Borrower</option>}
                  </select>
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
                      placeholderText={
                        datas.finalPaymentDate === null
                          ? "Select Date"
                          : datas.finalPaymentDate
                      }
                      className={`${style.calendarDate}`}
                    />
                  </div>
                  <div>
                    <svg
                      className={`${style.svgEdit}`}
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
                    defaultValue={datas.totalDuty}
                    onChange={(e) => {
                      updateCustomer(e);
                      validNumber.test(e.target.value) ? initErr.totalDuty = false : initErr.totalDuty = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
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
                <div className={`${style.inputDiv}`}>
                  <input
                    name="totalDubDutyAmount"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={states.customer.totalDubDutyAmount}
                    onChange={(e) => {
                      updateCustomer(e);
                      validNumber.test(e.target.value) ? initErr.totalDubDutyAmount = false : initErr.totalDubDutyAmount = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
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
                <div className={`${style.inputDiv}`}>
                  <div className={`${style.txt}`}>
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
                  style={{
                    height: "100%",
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <select
                    name="title"
                    id="customerTitle"
                    style={{
                      height: "100%",
                      width: "90%",
                      border: "none",
                      display: "flex",
                      position: "absolute",
                      left: "8px",
                    }}
                    onChange={(e) => updateCustomer(e)}
                  >
                    {datas.title === "Mr." ? <option selected value="Mr.">Mr.</option> : <option value="Mr.">Mr.</option>}
                    {datas.title === "Ms." ? <option selected value="Ms.">Ms.</option> : <option value="Ms.">Ms.</option>}
                    {datas.title === "Mrs." ? <option selected value="Mrs.">Mrs.</option> : <option value="Mrs.">Mrs.</option>}
                  </select>
                </div>
              </div>
              <div className={`${style.item}`}>
                <p className={`${style.txtblk}`}>Firstname</p>
                <div className={`${style.inputDiv}`}>
                  <input
                    name="firstname"
                    type="text"
                    className={`${style.txt}`}
                    defaultValue={datas.firstname}
                    onChange={(e) => {
                      updateCustomer(e);
                      validLetterAndSpace.test(e.target.value) ? initErr.firstname = false : initErr.firstname = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
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
                    defaultValue={datas.lastname}
                    onChange={(e) => {
                      updateCustomer(e);
                      validLetterAndSpace.test(e.target.value) ? initErr.lastname = false : initErr.lastname = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
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
                    defaultValue={datas.address.village}
                    onChange={(e) => {
                      updateAddress(e)
                      validNumberAndLetterAndSpace.test(e.target.value) ? initErr.village = false : initErr.village = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
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
                      defaultValue={datas.address.addressNo}
                      onChange={(e) => {
                        updateAddress(e)
                        validNumber.test(e.target.value) ? initErr.addressNo = false : initErr.addressNo = true;
                        if (Object.values(initErr).every(element => element === false)) {
                          setIsOpen(false);
                        }
                      }}
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
                      defaultValue={datas.address.floor}
                      onChange={(e) => {
                        updateAddress(e);
                        validNumber.test(e.target.value) ? initErr.floor = false : initErr.floor = true;
                        if (Object.values(initErr).every(element => element === false)) {
                          setIsOpen(false);
                        }
                      }}
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
                    defaultValue={datas.address.villageNo}
                    onChange={(e) => {
                      updateAddress(e);
                      validNumber.test(e.target.value) ? initErr.villageNo = false : initErr.villageNo = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
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
                    defaultValue={datas.address.alley}
                    onChange={(e) => {
                      updateAddress(e);
                      validNumberAndLetterAndSpace.test(e.target.value) ? initErr.alley = false : initErr.alley = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
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
                    defaultValue={datas.address.street}
                    onChange={(e) => {
                      updateAddress(e)
                      validNumberAndLetterAndSpace.test(e.target.value) ? initErr.street = false : initErr.street = true
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
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
                    defaultValue={datas.address.subDistrict}
                    onChange={(e) => {
                      updateAddress(e);
                      validNumberAndLetterAndSpace.test(e.target.value) ? initErr.subDistrict = false : initErr.subDistrict = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
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
                    defaultValue={datas.address.district}
                    onChange={(e) => {
                      updateAddress(e);
                      validNumberAndLetterAndSpace.test(e.target.value) ? initErr.district = false : initErr.district = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
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
                    defaultValue={datas.address.province}
                    onChange={(e) => {
                      updateAddress(e);
                      validLetterAndSpace.test(e.target.value) ? initErr.province = false : initErr.province = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                    }}
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
                    defaultValue={datas.address.postalCode}
                    onChange={(e) => {
                      updateAddress(e);
                      validPostalCode.test(e.target.value) ? initErr.postalCode = false : initErr.postalCode = true;
                      if (Object.values(initErr).every(element => element === false)) {
                        setIsOpen(false);
                      }
                      console.log(initErr);
                    }}
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
            validate();
            console.log(initErr);
            console.log(Object.values(initErr), Object.values(initErr).includes(true));
            if (Object.values(initErr).includes(true)) {
              setIsOpen(true);
            }
            else {
              await axios.put(
                `http://localhost:8080/api${path.replace(
                  "/batchdataresult",
                  ""
                )}`,
                states.customer
              );
              setIsOpen(false);
              navigate(-1);
            }
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

import { useLocation } from "react-router-dom";
import "./EditDetail.css";
import { useState } from "react";

export default function EditDetail() {
    const { state } = useLocation();
    
    const [states, setStates] = useState(state);
    
    const onInputChange = (e: { target: { name: any; value: any; }; }) => {
        setStates({...states, [e.target.name]: e.target.value});
    };

    return (
        <div className="ttspace">
            <div className="title">
                <div className="ttline"></div>
                <div>Edit Detail</div>
            </div>

            <form className="content">
                <div className="Contract Information">
                    <p className="tt">Contract Information</p>
                    <div className="grid-container">
                        <div className="item">
                            <p className="txtblk">Contract Number</p>
                            <input type="text" className="txt" defaultValue={states.customer.contract.number} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="item">
                            <p className="txtblk">Contract Start Date</p>

                            <div className="con ">
                                <input type="text" className="txt" defaultValue={state.customer.contract.startDate} />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="21"
                                    height="21"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#535353"
                                        d="M8 14q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm4 0q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm4 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="item">
                            <p className="txtblk">Contract End Date</p>
                            <input type="text" className="txt" defaultValue={state.customer.contract.endDate} />
                        </div>
                    </div>
                </div>
                <div className="Information of the applicant">
                    <p className="tt">Information of the applicant for stamp duty</p>
                    <div className="grid-container">
                        <div className="item">
                            <p className="txtblk">
                                Identification number of the applicant for stamp duty
                            </p>
                            <input type="text" className="txt" defaultValue={state.customer.contract.applicantId} />
                        </div>
                        <div className="item">
                            <p className="txtblk">Branch Number</p>
                            <input type="text" className="txt" defaultValue={state.customer.contract.branchNumber} />
                        </div>
                        <div className="item">
                            <p className="txtblk">Branch Type</p>
                            <input type="text" className="txt" defaultValue={state.customer.contract.branchType} />
                        </div>
                        <div className="item">
                            <p className="txtblk">Contract related Status</p>
                            <input type="text" className="txt" defaultValue={state.customer.contract.relatedStatus} />
                        </div>
                    </div>
                </div>
                <div className="Payment Details">
                    <p className="tt">Payment Details</p>
                    <div className="grid-container">
                        <div className="item">
                            <p className="txtblk">Final Payment Date</p>
                            <input type="text" className="txt" defaultValue={state.customer.finalPaymentDate} />
                        </div>
                        <div className="item">
                            <p className="txtblk">Duty Amount</p>
                            <input type="text" className="txt" defaultValue={state.customer.totalDuty} />
                        </div>
                        <div className="item">
                            <p className="txtblk">Dub Duty Amount</p>
                            <input type="text" className="txt" defaultValue={state.customer.totalDubDutyAmount} />
                        </div>
                        <div className="item">
                            <p className="txtblk">Total Amount</p>
                            <input type="text" className="txt" defaultValue={state.customer.totalPayment} />
                        </div>
                    </div>
                </div>
                <div className="Contract Party Details">
                    <p className="tt">Contract Party Details</p>
                    <div className="grid-container">
                        <div className="item">
                            <p className="txtblk">Title</p>
                            <input type="text" className="txt" defaultValue={state.customer.title} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="item">
                            <p className="txtblk">Name</p>
                            <input type="text" className="txt" defaultValue={state.customer.firstname} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="item">
                            <p className="txtblk">Last Name</p>
                            <input type="text" className="txt" defaultValue={state.customer.lastname} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="item">
                            <p className="txtblk">Village / Building</p>
                            <input type="text" className="txt" defaultValue={state.customer.address.village} />
                        </div>
                        <div className="minigrid">
                            <div className="item">
                                <p className="minitxtblk">Address Number</p>
                                <input type="" className="minitxt" defaultValue={state.customer.address.addressNo} />
                            </div>
                            <div className="item">
                                <p className="minitxtblk">Floor</p>
                                <input type="" className="minitxt" defaultValue={state.customer.address.floor} />
                            </div>
                        </div>
                        <div className="item">
                            <p className="txtblk">Village Number</p>
                            <input type="text" className="txt" defaultValue={state.customer.address.villageNo} />
                        </div>
                        <div className="item">
                            <p className="txtblk">Alley / Section</p>
                            <input type="text" className="txt" defaultValue={state.customer.address.alley} />
                        </div>
                        <div className="item">
                            <p className="txtblk">Street</p>
                            <input type="text" className="txt" defaultValue={state.customer.address.street} />
                        </div>
                        <div className="item">
                            <p className="txtblk">Subdistrict</p>
                            <input type="text" className="txt" defaultValue={state.customer.address.subDistrict} />
                        </div>
                        <div className="item">
                            <p className="txtblk">District</p>
                            <input type="text" className="txt" defaultValue={state.customer.address.district} />
                        </div>
                        <div className="item">
                            <p className="txtblk">Province</p>
                            <input type="text" className="txt" defaultValue={state.customer.address.province} />
                        </div>
                        <div className="item">
                            <p className="txtblk">Postal Code</p>
                            <input type="text" className="txt" defaultValue={state.customer.address.postalCode} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

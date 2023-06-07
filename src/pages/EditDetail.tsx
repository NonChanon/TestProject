import React from "react";
import "./EditDetail.css";

export default function EditDetail() {
    return (
        <div className="ttspace">
            <div className="title">
                <div className="ttline"></div>
                <div>Edit Detail</div>
            </div>

            <div className="content">
                <div className="Contract Information">
                    <p className="tt">Contract Information</p>
                    <div className="grid-container">
                        <div className="item">
                            <p className="txtblk">Contract Number</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Contract Start Date</p>

                            <div className="con ">
                                <input type="text" className="txt " />
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
                            <input type="text" className="txt" />
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
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Branch Number</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Branch Type</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Contract related Status</p>
                            <input type="text" className="txt" />
                        </div>
                    </div>
                </div>
                <div className="Payment Details">
                    <p className="tt">Payment Details</p>
                    <div className="grid-container">
                        <div className="item">
                            <p className="txtblk">Final Payment Date</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Duty Amount</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Dub Duty Amount</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Total Amount</p>
                            <input type="text" className="txt" />
                        </div>
                    </div>
                </div>
                <div className="Contract Party Details">
                    <p className="tt">Contract Party Details</p>
                    <div className="grid-container">
                        <div className="item">
                            <p className="txtblk">Title</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Name</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Last Name</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Village / Building</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="minigrid">
                            <div className="item">
                                <p className="minitxtblk">Address Number</p>
                                <input type="" className="minitxt" />
                            </div>
                            <div className="item">
                                <p className="minitxtblk">Floor</p>
                                <input type="" className="minitxt" />
                            </div>
                        </div>
                        <div className="item">
                            <p className="txtblk">Village Number</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Alley / Section</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Street</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Subdistrict</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">District</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Province</p>
                            <input type="text" className="txt" />
                        </div>
                        <div className="item">
                            <p className="txtblk">Postal Code</p>
                            <input type="text" className="txt" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

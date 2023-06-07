import React from 'react'
import "./EditDetail.css"


export default function EditDetail() {
    return (
        <div className="ttspace">
            <div className="title">
                <div className="ttline"></div>
                <div>Edit Detail</div>
            </div>

            <div className='content'>
                <div className=''>
                    <p className='tt'>Contract Information</p>
                    <div className='col'>
                        <div className=''>Contract Number<input type="" className='txt' /></div>
                        <div className=''>Contract Start Date<input type="" className='txt' /></div>
                        <div className=''>Contract End Date<input type="" className='txt' /></div>
                    </div>
                </div>
                <div className=''>
                    <p className='tt'>Contract Information</p>
                    <div className='col'>
                        <div className=''>asdsar<input type="" className='txt' /></div>
                        <div className=''>Contract Start Date<input type="" className='txt' /></div>
                        <div className=''>Contract End Date<input type="" className='txt' /></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

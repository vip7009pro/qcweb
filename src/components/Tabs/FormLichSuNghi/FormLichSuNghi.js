import React from 'react'
import '../FormLichSuNghi/FormLichSuNghi.css'

export default function FormLichSuNghi() {
    return (
        <div id="menu1"><br/>
            <h3>Tra lịch sử nghỉ của bản thân</h3>
            <p>Tra cứu lịch sử nghỉ của bản thân tại đây</p>
            <div className ="container">
            <button type ="button" id="changeview_offhistory" className ="btn btn-info"> Mở rộng/ Thu hẹp
            </button>
            <div className ="rendered_table" id="off_data">
            Lich su nghi
            </div>
            </div>
        </div>
    )
}

import React from 'react'
import '../FormLichSuDiLam/FormLichSuDiLam.css'
export default function FormLichSuDiLam() {
    return (
        <div id="tradiemdanh"><br />
            <h3>Tra lịch sử đi làm của bản thân</h3>
            <form method="post">
                <div className="form-group">
                    <label htmlFor="date"><b>Từ ngày </b></label> <br />
                    <input type="date" id="dd_from_date" name="start_date"></input>
                    <br />
                    <label htmlFor="date"><b>Tới ngày </b></label><br />
                    <input type="date" id="dd_to_date" name="end_date"></input>
                </div>
                <button type="button" className="btn btn-primary" id="getdiemdanh">Tra điểm danh</button>
                <button type="button" id="changeview_diemdanh" className="btn btn-info"> Mở rộng/ Thu hẹp </button>
            </form>            
            <div className="rendered_table" id="attendance_history">
                Lich su diem danh
            </div>
        </div>
    )
}

import React from 'react'
import '../FormDangKyNghi/FormDangKyNghi.css'

export default function FormDangKyNghi(){
    return (
        <div id="formdangkynghi">
            <form id="form_dk_nghi" method="post">
                <div className="form-group">
                    <label for="exampleFormControlSelect1"><b>Chọn ca</b></label>
                    <select className="form-control" id="ca_nghi" name="ca_nghi">
                        <option>Ca ngày</option>
                        <option>Ca đêm</option>
                    </select>
                </div>

                <div className="form-group">
                    <label for="date"><b>Nghỉ từ ngày <p id="time_1">(08:00)</p></b></label> <br></br>
                    <input type="date" id="nghi_from_date" name="ngaybatdau"></input>
                    <br></br>
                    <label for="date"><b>Nghỉ tới ngày<p id="time_2">(17:00)</p> </b></label> <br></br>
                    <input type="date" id="nghi_to_date" name="ngayketthuc"></input>
                </div>

                <div className="form-group">
                    <label for="exampleFormControlSelect1"><b>Chọn kiểu nghỉ</b></label>
                    <select className="form-control" id="reason" name="reason_name">
                        <option>Nghỉ phép</option>
                        <option>Nửa phép</option>
                        <option>Việc riêng</option>
                        <option>Nghỉ ốm</option>
                        <option>Chế độ</option>
                        <option>Không lý do</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="text"><b>Lý do cụ thể:</b></label>
                    <input type="text" className="form-control" placeholder="Lý do sự việc nghỉ cụ thể"
                        id="nghi_remark" name="remark_content"></input>
                </div>
                <button type="button" className="btn btn-primary" id="smt_button">Đăng ký</button>
            </form>
        </div>
    )
}
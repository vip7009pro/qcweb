import React from 'react'
import { useState } from 'react'
import swal from 'sweetalert';
import { dangkynghi } from '../../../Api/Api';
import '../FormDangKyNghi/FormDangKyNghi.css'
export function returnDateFormat(today) {
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    if (month + 1 < 10) month = '0' + (month);
    if (date < 10) date = '0' + date;
    return year + "-" + (month + 1) + "-" + date;
}
export default function FormDangKyNghi() {
    const [canghi, setCaNghi] = useState('Ca ngày');
    const [fromdate, setFromDate] = useState(returnDateFormat(new Date()));
    const [todate, setToDate] = useState(returnDateFormat(new Date()));
    const [offtype, setOffType] = useState('Nghỉ phép');
    const [remark, setRemark] = useState('');
    console.log(canghi);
    const handleSubmit = (e) => {
        console.log("Submit clicked");
        dangkynghi(canghi, fromdate, todate, offtype, remark)
            .then(data => {
                let result = data.data;
                console.log(result);
                if (result == 'OK') {
                    swal("Thông báo", "Đăng ký nghỉ thành công", "success");
                } else if (result == 'NG') {
                    swal("Thông báo", "Lỗi: đã đăng ký ngày này rồi", "error");
                }
                else {
                    swal("Thông báo", "Lỗi: " + result, "error");
                }
            })
            .catch(error => {
                console.log("Loi: " + error + " ");
            });
    }
    return (
        <div id="formdangkynghi"  className="formdiv">
            <h3>Đăng ký nghỉ</h3>
            <form id="form_dk_nghi" method="post">
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Chọn ca</b></label>
                    <select className="form-control" id="ca_nghi" name="ca_nghi" onChange={(e) => { setCaNghi(e.target.value) }}>
                        <option>Ca ngày</option>
                        <option>Ca đêm</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date"><b>Nghỉ từ ngày <p id="time_1">(08:00)</p></b></label> <br></br>
                    <input type="date" id="nghi_from_date" name="ngaybatdau" value={fromdate} onChange={(e) => { setFromDate(e.target.value) }}></input>
                    <br></br>
                    <label htmlFor="date"><b>Nghỉ tới ngày<p id="time_2">(17:00)</p> </b></label> <br></br>
                    <input type="date" id="nghi_to_date" name="ngayketthuc" value={todate} onChange={(e) => { setToDate(e.target.value) }}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Chọn kiểu nghỉ</b></label>
                    <select className="form-control" id="reason" name="reason_name" onChange={(e) => { setOffType(e.target.value) }}>
                        <option>Nghỉ phép</option>
                        <option>Nửa phép</option>
                        <option>Việc riêng</option>
                        <option>Nghỉ ốm</option>
                        <option>Chế độ</option>
                        <option>Không lý do</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="text"><b>Lý do cụ thể:</b></label>
                    <input type="text" className="form-control" placeholder="Lý do sự việc nghỉ cụ thể" id="nghi_remark" name="remark_content" onChange={(e) => { setRemark(e.target.value) }}></input>
                </div>
                <button type="button" className="btn btn-primary" id="smt_button" onClick={handleSubmit}>Đăng ký</button>
            </form>
        </div>
    )
}
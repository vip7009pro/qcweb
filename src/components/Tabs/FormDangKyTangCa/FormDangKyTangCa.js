import React from 'react'
import '../FormDangKyTangCa/FormDangKyTangCa.css'
export default function FormDangKyTangCa() {
    return (
        <div id="overtime"><br />
            <h3>Tăng ca</h3>
            <p>Đăng ký tăng ca trong ngày tại đây</p>
            <form id="form_dk_tangca" method="post">
                <div className="form-group">
                    <label htmlFor="tangcayesno"><b>Bạn có tăng ca hay không ?</b></label>
                    <select className="form-control" id="tangcayesno" name="tangcayesno">
                        <option>Có tăng ca</option>
                        <option>Không tăng ca</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="text"><b>Thời gian bắt đầu:</b> <i>(Ví dụ 17h00p thì nhập : 1700)
                    </i></label>
                    <input type="text" className="form-control" placeholder="Giờ bắt đầu tăng ca"
                        id="over_start" name="over_start"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="text"><b>Thời gian kết thúc:</b> <i>(Ví dụ 20h00p thì nhập : 2000)
                    </i></label>
                    <input type="text" className="form-control" placeholder="Giờ kết thúc tăng ca"
                        id="over_finish" name="over_finish"></input>
                </div>
            </form>
            <button className="btn btn-primary" id="overtime_submit">Đăng ký hôm nay</button>
            <button className="btn btn-success" id="overtime_submit_confirm">Confirm hôm qua</button>
        </div>
    )
}

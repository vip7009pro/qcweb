import React from 'react'
import '../FormDiemDanhTong/FormDiemDanhTong.css'

export default function FormDiemDanhTong() {
    return (
        <div id="total_att_panel" ><br />
            <h3>Điểm danh tổng:</h3>
            <form id="total_att_form" method="post">
                <div className="form-group">
                    <label><b>Chọn team:</b>
                        <select className="form-control" id="team_name_total" name="team_name_total">
                            <option>Tất cả</option>
                            <option>TEAM 1 + Hành chính</option>
                            <option>TEAM 2+ Hành chính</option>
                            <option>TEAM 1</option>
                            <option>TEAM 2</option>
                            <option>Hành chính</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label><b>Chọn bộ phận chính :</b>
                        <select className="form-control" id="main_deparment_name" name="main_deparment_name">
                            <option>Toàn bộ</option>
                            <option>QC</option>
                            <option>INSPECTION</option>
                        </select>
                    </label>
                </div>

                <div className="form-group">
                    <label><b>Chọn bộ phận phụ:</b>
                        <select className="form-control" id="deparment_name" name="deparment_name">
                            <option>Toàn bộ</option>
                            <option>QC</option>
                            <option>PD</option>
                            <option>IQC</option>
                            <option>PQC1</option>
                            <option>PQC3</option>
                            <option>KT1</option>
                            <option>KT3</option>
                            <option>OQC</option>
                            <option>CS</option>
                            <option>ĐỘ TIN CẬY</option>
                            <option>ISO</option>
                            <option>DATA</option>
                            <option>MISS CLEAN</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label><b>Từ ngày:</b>
                        <input type="date" id="from_date_total" name="from_date_total"></input>
                    </label>
                    <br />
                    <label><b>Tới ngày:</b>
                        <input type="date" id="to_date_total" name="to_date_total"></input>
                    </label>
                </div>
                <div className="form-group">
                    <input type="checkbox" className="form-check-input" id="nghisinhcheckbox"></input>
                    <label><b>Tính cả nghỉ sinh:</b> </label>

                </div>
                <br />
            </form>
            <button type="button" className="btn btn-primary" id="total_att_button">Tra cứu</button>
            <button type="button" id="changeview_diemdanh_total" className="btn btn-info">Mở rộng/ Thu hẹp</button>
            <div className="rendered_table" id="total_att_table"></div>
        </div>
    )
}

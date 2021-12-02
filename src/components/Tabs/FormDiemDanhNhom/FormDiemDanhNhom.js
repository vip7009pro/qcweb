import React from 'react'
import '..//FormDiemDanhNhom/FormDiemDanhNhom.css'
export default function FormDiemDanhNhom() {
    return (
        <div id="diemdanh"><br />
            <h3>Điểm danh cho nhóm của mình</h3>
            <form id="form_diem_danh" method="post">
                <div className="form-group">
                    <label htmlFor="team_name"><b>Chọn team để điểm danh</b></label>
                    <select className="form-control" id="team_name" name="team_name">
                        <option>Tất cả</option>
                        <option>TEAM 1 + Hành chính</option>
                        <option>TEAM 2+ Hành chính</option>
                        <option>TEAM 1</option>
                        <option>TEAM 2</option>
                        <option>Hành chính</option>
                    </select>
                </div>
            </form>
            <button type="button" className="btn btn-primary" id="nhom_att_button">Tra cứu team</button>
            <button type="button" id="changeview_empl" className="btn btn-info"> Mở rộng/ Thu hẹp </button>
            <div className="rendered_table" id="empl_list">
                Danh sách nhân lực tại bộ phận
            </div>
        </div>
    )
}

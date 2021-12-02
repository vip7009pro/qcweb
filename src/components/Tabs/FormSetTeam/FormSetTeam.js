import React from 'react'
import '../FormSetTeam/FormSetTeam.css'
export default function FormSetTeam() {
    return (
        <div id="hr_modify"><br />
            <h3>Điều chuyển nhân sự qua lại giữa các team</h3>
            <p>Leader mới có thể thực hiện điều chuyển</p>
            <div className="container">
                <button type="button" id="changeview_hr_modify" className="btn btn-info"> Mở rộng/ Thu hẹp
                </button>
                <div className="rendered_table" id="hr_modify_list">
                    Danh sách nhân lực tại bộ phận
                </div>
            </div>
        </div>
    )
}

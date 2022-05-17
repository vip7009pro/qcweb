import React, { useEffect } from 'react'
import { useState } from 'react'
import swal from 'sweetalert';
import { setteam } from '../../../Api/Api';
import { getHTMLTABLE2_dieuchuyenteam } from '../../../Api/tableRender';
import { addDataTabe, JQF, toggleTableView } from '../../../jq';
import '../FormSetTeam/FormSetTeam.css'
export default function FormSetTeam() {
    const [table, setTable] = useState([]);
    const handleSubmit = () => {
        setteam()
            .then(response => {
                let data = response.data;
                console.log(response);
                console.log(data);
                if (data == 'NO_LEADER') {
                    swal("Thông báo", "Bạn ko fai leader,mời phắn", "info");
                }
                else if (data == 'NO_DATA') {
                    swal("Thông báo", "Không có data", "info");
                }
                else {
                    var res = getHTMLTABLE2_dieuchuyenteam(data, 'hr_modify_table');
                    setTable(res);
                    addDataTabe('hr_modify_table',0,'asc');
                }
            })
            .catch(error => {
                console.log('Loi: ' + error + ' ');
            });
        JQF();
    }
    useEffect(() => {
        handleSubmit();
    }, [])
    return (
        <div id="hr_modify" className="formdiv"><br />
            <h3>Điều chuyển nhân sự qua lại giữa các team</h3>
            <p>Leader mới có thể thực hiện điều chuyển</p>
            <div>
                <button type="button" id="refresh_setTeam" className="btn btn-primary" onClick={handleSubmit}>Refresh</button>
                <button type="button" id="changeview_hr_modify" className="toggleTableBT btn btn-info" onClick={toggleTableView}> Mở rộng/ Thu hẹp
                </button>
                <div className="rendered_table" id="hr_modify_list">
                    Danh sách nhân lực tại bộ phận
                    <span dangerouslySetInnerHTML={{ __html: table }}></span>
                </div>
            </div>
        </div>
    )
}

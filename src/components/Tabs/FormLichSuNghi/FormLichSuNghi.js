import React, { useState, useEffect } from 'react'
import { off_history } from '../../../Api/Api';
import { getHTMLTABLE2_lichsunghi } from '../../../Api/tableRender';
import { addDataTabe, JQF, toggleTableView } from '../../../jq';
import '../FormLichSuNghi/FormLichSuNghi.css'
export default function FormLichSuNghi() {
    const [table, setTable] = useState([]);
    useEffect(() => {
        off_history()
            .then(response => {
                let data = response.data;
                console.log(data);
                if (data.tk_status == "NG") {
                    setTable([]);
                }
                else {
                    setTable(getHTMLTABLE2_lichsunghi(JSON.parse(data.data),'off_his_table'));
                    addDataTabe('off_his_table',0,'desc');
                }
            })
            .catch(error => {
                console.log("Loi: " + error + " ");
            });
            JQF();
            
    }, []);
    return (
        <div id="menu1"  className="formdiv"><br />
            <h3>Tra lịch sử nghỉ của bản thân</h3>
            <p>Tra cứu lịch sử nghỉ của bản thân tại đây</p>
            <div className="container">
                <button type="button" id="changeview_offhistory" className="toggleTableBT btn btn-info" onClick={toggleTableView}> Mở rộng/ Thu hẹp
                </button>
                <div className="rendered_table" id="off_data">
                    Lịch sử nghỉ:
                    <span dangerouslySetInnerHTML={{ __html: table }}></span>
                </div>
            </div>
        </div>
    )
}

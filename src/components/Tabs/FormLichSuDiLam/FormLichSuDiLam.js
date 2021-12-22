import React, { useState, useEffect } from 'react'
import { on_history } from '../../../Api/Api';
import { getHTMLTABLE2_mydiemdanh } from '../../../Api/tableRender';
import { addDataTabe, JQF, toggleTableView } from '../../../jq';
import { returnDateFormat } from '../FormDangKyNghi/FormDangKyNghi';
import '../FormLichSuDiLam/FormLichSuDiLam.css'

export default function FormLichSuDiLam() {
    const [table, setTable] = useState([]);
    const [startdate, setStartDate] = useState(returnDateFormat(new Date()));
    const [enddate, setEndDate] = useState(returnDateFormat(new Date()));
    const handleSubmit = ()=>{
        on_history(startdate,enddate)
        .then(response => {
            let data = response.data;
            console.log(data);
            if (data.tk_status == "NG") {
                setTable([]);
            }
            else {
                setTable(getHTMLTABLE2_mydiemdanh(JSON.parse(data.data),'mydiemdanh_tb'));
                addDataTabe('mydiemdanh_tb','desc');
            }
        })
        .catch(error => {
            console.log("Loi: " + error + " ");
        });
    }
    useEffect(() => {
        handleSubmit();
        JQF();
    }, []);

    return (
        <div id="tradiemdanh"  className="formdiv"><br />
            <h3>Tra lịch sử đi làm của bản thân</h3>
            <form method="post">
                <div className="form-group">
                    <label htmlFor="date"><b>Từ ngày </b></label> <br />
                    <input type="date" id="dd_from_date" name="start_date" value={startdate} onChange={(e) => { setStartDate(e.target.value) }}></input>
                    <br />
                    <label htmlFor="date"><b>Tới ngày </b></label><br />
                    <input type="date" id="dd_to_date" name="end_date" value={enddate} onChange={(e) => { setEndDate(e.target.value) }}></input>
                </div>
                <button type="button" className="btn btn-primary" id="getdiemdanh" onClick={handleSubmit}>Tra điểm danh</button>
                <button type="button" id="changeview_diemdanh" className="toggleTableBT btn btn-info" onClick={toggleTableView}> Mở rộng/ Thu hẹp </button>
            </form>            
            <div className="rendered_table" id="attendance_history">
                Lịch sử điểm danh:
                <span dangerouslySetInnerHTML={{ __html: table }}></span>
            </div>
        </div>
    )
}

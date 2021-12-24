import React, { useEffect } from 'react'
import '../FormDiemDanhTong/FormDiemDanhTong.css'
import { useState } from 'react'
import { returnDateFormat } from '../FormDangKyNghi/FormDangKyNghi';
import { diemdanhtong } from '../../../Api/Api';
import { getHTMLTABLE2_diemdanhtong } from '../../../Api/tableRender';
import swal from 'sweetalert';
import { addDataTabe, JQF, toggleTableView } from '../../../jq';

export default function FormDiemDanhTong() {  
    const [teamname, setTeamname] = useState('Tất cả');
    const [maindept, setMainDept] = useState('Toàn bộ');
    const [subdept, setSubDept] = useState('Toàn bộ');
    const [fromdate,setFromDate] = useState(returnDateFormat(new Date()));
    const [todate,setToDate] = useState(returnDateFormat(new Date()));
    const [nghisinhvalue,setNghiSinhValue] = useState('false');
    const [table, setTable] = useState([]);   

    const toggleNghiSinh = ()=>{
        if(nghisinhvalue =='false')
        {
            setNghiSinhValue('true');
        }
        else
        {
            setNghiSinhValue('false');
        }
    }
    const handleSubmit = () => {
        console.log("Submit clicked");
        diemdanhtong(fromdate, todate, nghisinhvalue, subdept, maindept, teamname)
            .then(response => {
                let data = response.data;
                console.log(data);
                if (data.tk_status == 'NO_LEADER') {
                    swal("Thông báo", "Bạn không phải là leader, mời phắn", "error");
                }
                else {
                    swal("Thông báo","Có " + JSON.parse(data.data).length + " người nha","success");
                    setTable(getHTMLTABLE2_diemdanhtong(JSON.parse(data.data),'empl_tb_total'));
                    addDataTabe('empl_tb_total',0,'asc');                    
                }
            })
            .catch(error => {
                console.log("Loi: " + error + " ");
            });
    }
    
    useEffect(()=>{
        handleSubmit();
        JQF();
    },[]);

    return (
        <div id="total_att_panel" className="container formdiv"><br />
            <form id="total_att_form" method="post">
                <div className="form-group">
                    <label htmlFor="team_name"><b>Chọn team</b></label>
                    <select className="form-control" id="team_name_total" name="team_name_total"  onChange={(e) => { setTeamname(e.target.value) }}>
                        <option>Tất cả</option>
                        <option>TEAM 1 + Hành chính</option>
                        <option>TEAM 2+ Hành chính</option>
                        <option>TEAM 1</option>
                        <option>TEAM 2</option>
                        <option>Hành chính</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="main_deparment_name"><b>Chọn bộ phận chính </b></label>
                    <select className="form-control" id="main_deparment_name" name="main_deparment_name" onChange={(e) => { setMainDept(e.target.value) }}>
                        <option>Toàn bộ</option>
                        <option>QC</option>
                        <option>INSPECTION</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="deparment_name"><b>Chọn bộ phận phụ </b></label>
                    <select className="form-control" id="deparment_name" name="deparment_name" onChange={(e) => { setSubDept(e.target.value) }}>
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
                </div>
                <div className="form-group">
                    <label htmlFor="date"><b>Từ ngày </b></label> <br />
                    <input type="date" id="from_date_total" name="from_date_total" value={fromdate} onChange={(e) => { setFromDate(e.target.value) }}/>
                    <br />
                    <label htmlFor="date"><b>Tới ngày </b></label> <br />
                    <input type="date" id="to_date_total" name="to_date_total" value={todate} onChange={(e) => { setToDate(e.target.value) }}/>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="nghisinhcheckbox" defaultChecked={!nghisinhvalue}  onChange={toggleNghiSinh}/>
                    <label className="form-check-label" htmlFor="checkbox"><b>Tính cả nghỉ sinh</b></label>
                </div>
                <br />
            </form>
            <button type="button" className="btn btn-primary" id="total_att_button" onClick={handleSubmit}>Tra cứu</button>
            <button type="button" id="changeview_diemdanh_total" className="toggleTableBT btn btn-info" onClick={toggleTableView}>Mở rộng/ Thu hẹp</button>
            <div className="rendered_table" id="total_att_table">
                <span dangerouslySetInnerHTML={{ __html: table }}></span>
            </div>         
        </div>
    )
}

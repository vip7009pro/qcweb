import React, { useState, useEffect, useMemo } from 'react'
import '../FormDiemDanhNhom/FormDiemDanhNhom.css'
import { diemdanhnhom, login } from '../../../Api/Api'
import { addDataTabe, JQF } from '../../../jq';
import DiemDanhNhomTable from '../../Table/DiemDanhNhomTable/DiemDanhNhomTable';
import { getHTMLTABLE2_diemdanhnhom } from '../../../Api/tableRender';
export default function FormDiemDanhNhom() {
    const [teamname, setTeamName] = useState("Tất cả");
    const [table, setTable] = useState([]);
    const [tbHeader, setTbHeader] = useState([]);    
    useEffect(() => {
        diemdanhnhom(teamname)
            .then(data => {
                console.log(data.data);  
                if (data.data == "NO_DATA") {                    
                    setTable([]);
                }
                else {
                    /* var header_array = Object.keys(data.data[0]).map((element) => {
                        return {
                            Header: element,
                            accessor: element,
                        };
                    });
                    header_array = [{Header: 'TEST', accessor: 'test'}, ...header_array];
                    console.log(header_array);
                    data.data.forEach(element => {
                        element = Object.assign(element, { test: '<button>NutBam</button>' });
                    });
                    setTbHeader(header_array);
                    setTable(data.data); */
                    setTable(getHTMLTABLE2_diemdanhnhom(data.data,'empl_tb')); 
                    addDataTabe('empl_tb');
                }
            })
            .catch(error => {
                console.log("Loi: " + error + " ");
            });
            JQF();       
    }, [teamname]);
    return (
        <div id="diemdanh">
            <h3>Điểm danh cho nhóm của mình</h3>
            <form id="form_diem_danh" method="post">
                <div className="form-group">
                    <label htmlFor="team_name"><b>Chọn team để điểm danh</b></label>
                    <select className="form-control" id="team_name" name="team_name" onChange={(e) => { setTeamName(e.target.value) }}>
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
             <div className="rendered_table" id="empl_list"> <span dangerouslySetInnerHTML={{__html: table}}></span> </div> 
           {/*  <DiemDanhNhomTable columns={tbHeader} data={table} /> */}
        </div>
    )
}

import React, { useContext, useState, useEffect, useMemo } from 'react'
import '../FormDiemDanhNhom/FormDiemDanhNhom.css'
import { diemdanhnhom, login } from '../../../Api/Api'
import { addDataTabe, diemdanhOFF, diemdanhON, JQF, toggleTableView } from '../../../jq';
import DiemDanhNhomTable from '../../Table/DiemDanhNhomTable/DiemDanhNhomTable';
import { getHTMLTABLE2_diemdanhnhom } from '../../../Api/tableRender';
import swal from 'sweetalert';
import { SocketContext } from '../../../Api/Context';
export default function FormDiemDanhNhom() {
    const SocketRefContext = useContext(SocketContext); 
    const [teamname, setTeamName] = useState("Tất cả");
    const [table, setTable] = useState([]);
    const [tbHeader, setTbHeader] = useState([]);    
    const handleSubmit = ()=>{
        diemdanhnhom(teamname)
            .then(data => {
                console.log(data.data);  
                if (data.data == "NO_DATA") {                    
                    setTable([]);
                }
                else if(data.data == "NO_LEADER")
                {
                    swal("Thông báo","Bạn không phải leader, mời phắn","error");
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

                    swal("Thông báo","Có " + data.data.length + " người nha","success");
                    setTable(getHTMLTABLE2_diemdanhnhom(data.data,'empl_tb')); 
                    addDataTabe('empl_tb');
                }
            })
            .catch(error => {
                console.log("Loi: " + error + " ");
            });
            
    }
    useEffect(() => {
        handleSubmit();
        JQF();  
        diemdanhON(SocketRefContext);
        diemdanhOFF(SocketRefContext);
             
    }, [teamname]);
    return (
        <div id="diemdanh" className="formdiv">
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
            <button type="button" className="btn btn-primary" id="nhom_att_button" onClick={handleSubmit}>Tra cứu team</button>
            <button type="button" id="changeview_empl" className="toggleTableBT btn btn-info" onClick={toggleTableView}> Mở rộng/ Thu hẹp </button>
             <div className="rendered_table" id="empl_list"> <span dangerouslySetInnerHTML={{__html: table}}></span> </div> 
           {/*  <DiemDanhNhomTable columns={tbHeader} data={table} /> */}
        </div>
    )
}

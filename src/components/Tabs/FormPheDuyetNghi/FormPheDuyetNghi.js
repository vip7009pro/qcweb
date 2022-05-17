import React, { useState, useEffect } from 'react'
import '../FormPheDuyetNghi/FormPheDuyetNghi.css'
import swal from 'sweetalert';
import { pheduyetnghi } from '../../../Api/Api';
import { getHTMLTABLE2_pheduyet } from '../../../Api/tableRender';
import { addDataTabe, JQF, toggleTableView } from '../../../jq';

export default function FormPheDuyetNghi() {   
    const [table, setTable] = useState([]);    
    const handleSubmit = ()=>{
        console.log("tra lai phe duyet nghi");
        pheduyetnghi()
        .then(response => {
            let data = response.data;
            console.log(data);
            if (data.tk_status == "NO_LEADER") {
                swal("Thông báo","Bạn không phải leader","info");
                setTable([]);
            }
            else {
                setTable(getHTMLTABLE2_pheduyet(JSON.parse(data.data),'approve_table'));
                addDataTabe('approve_table',0,'desc');
            }
        })
        .catch(error => {
            console.log("Loi: " + error + " ");
        });
    }
    useEffect(()=>{
        handleSubmit();
        JQF();        
    },[])
    return (
        <div id="approve" className="formdiv"><br />
            <h3>Leader phê duyệt nghỉ</h3>
            <p>Chỉ leader truy cập được nội dung này</p>            
            <button type="button" className="btn btn-primary" id="trapheduyet" onClick={handleSubmit}>Tra cứu nghỉ</button>
            <button type="button" id="changeview_duyet" className="toggleTableBT btn btn-info" onClick={toggleTableView}> Mở rộng/ Thu hẹp </button>
            <div className="rendered_table" id="off_approve">
                Phê duyệt nghỉ:
                <span dangerouslySetInnerHTML={{ __html: table }}></span>
            </div>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import '../CNDB2/CNDB2.css'
import moment from 'moment';
import { generalQuery, get_pqc1_output_data, insertPQC1, temp_info } from '../../../../Api/Api';
import { getHTMLTABLE22 } from '../../../../Api/tableRender';
import swal from 'sweetalert';
import { keydowninput, modifyColumn, readingTable, updateColumn } from '../../../../jq';
import Draggable from 'react-draggable';
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
export default function CNDB2() {    
    const [cndb2_cndb_startdate, setcndb2_cndb_startdate] = useState(moment().format("YYYY-MM-DD"));
    const [cndb2_cndb_enddate, setcndb2_cndb_enddate] = useState(moment().format("YYYY-MM-DD")); 
    const [cndb2_cndb_no, setcndb2_cndb_no] = useState('');
    const [cndb2_reg_empl_no, setcndb2_reg_empl_no] = useState('');
    const [cndb2_m_lot_no, setcndb2_m_lot_no] = useState('');
    const [cndb2_m_name,setcndb2_m_name]= useState('');
    const [cndb2_defect_name, setcndb2_defect_name] = useState('');
    const [cndb2_defect_content, setcndb2_defect_content] = useState('');
    const [cndb2_remark, setcndb2_remark] = useState('');
    const [gname, setGName] = useState('');
    const [cndb2_reg_empl_name, setPqc1LineQCEmplName] = useState(''); 
    const [checkcndb,setcheckCNDB] = useState(false);
    const [table, setTable] = useState('');

    const handlecheckCNDBNO = (cndbno) => {
        let insertdata = {
            CNDB_NO: cndb2_cndb_no
        };
        generalQuery('checkCNDBNO',insertdata)
        .then(response => {
            let Jresult = response.data;
            if (Jresult.tk_status == 'OK') {       
               // console.log(Jresult.data);         
               setcheckCNDB((Jresult.data[0].CNDB_COUNT>0) ? 'CÓ tồn tại' : 'KHÔNG tồn tại');                
            }
            else {
                swal("Lỗi", Jresult.message, "error");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    const encodeCNDBNO = (cndbno)=>{        
        const monthArray = ['A','B','C','D','E','F','G','H','I','J','K','L'];
        let cndbencode;
        if(cndbno.length!=8)
        {
            swal("Có lỗi","Số CNĐB không đúng quy cách","error");
        }
        else
        {
            cndbencode = cndbno[1] + monthArray[Number(cndbno.substring(2,4))-1] +cndbno.substring(4,6) + cndbno[7];
        }
        return cndbencode;
    }
    
    const handleMNAME = ()=>{
        let insertdata = {
            M_LOT_NO: cndb2_m_lot_no
        };
        generalQuery('checkMNAMEfromLot',insertdata)
        .then(response => {
            let Jresult = response.data;
            if (Jresult.tk_status == 'OK') {                
                setcndb2_m_name(Jresult.data[0].M_NAME + " | " + Jresult.data[0].WIDTH_CD);                
            }
            else {
                swal("Lỗi", Jresult.message, "error");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(checkcndb=='CÓ tồn tại')
        {
            let insertdata = {            
                CNDB_NO: cndb2_cndb_no,            
                CNDB_ENCODE: encodeCNDBNO(cndb2_cndb_no),
                SPECIAL_START: cndb2_cndb_startdate,
                SPECIAL_END: cndb2_cndb_enddate,
                M_LOT_NO: cndb2_m_lot_no,                          
                REMARK: cndb2_remark
            };
            generalQuery('insertcndb2data',insertdata)
                .then(response => {
                    let Jresult = response.data;
                    if (Jresult.tk_status == 'OK') {
                        swal("Chúc mừng", "Nhập data thành công", "success");
                        handleGetCNDBData();
                    }
                    else {
                        swal("Lỗi", Jresult.message, "error");
                    }
                })
                .catch(error => {
                    console.log(error);
                })

        }
        else
        {
            swal("Lỗi", 'Không tồn tại số CNĐB này', "error");
        }
        
    }
    const handleReset = (e) => {
        e.preventDefault();
        setcndb2_cndb_no('');
        setcndb2_reg_empl_no('');
        setcndb2_m_lot_no('');
        setcndb2_defect_name('');
        setcndb2_defect_content('');
        setcndb2_remark('');        
        
        
    }    
    const handleGetCNDBData = () => {
        let insertdata={

        }
        generalQuery('getcndb2data',insertdata)
        .then(response => {
            let Jresult = response.data;
            if (Jresult.tk_status == 'OK') {                
                setTable(getHTMLTABLE22(Jresult.data, 'pqc_data_table'));   
            }
            else {
                swal("Lỗi", Jresult.message, "error");
            }
        })
        .catch(error => {
            console.log(error);
        })      
    }
    
    useEffect(() => {
        handleGetCNDBData();
    }, [])
    return (
        <div id="pqc1_panel">
            <Draggable>
                <div className='pqcform'>
                    <h2>Form cập nhật LOT cho CNĐB</h2>
                    <form className='pqc1form'>
                        <div className='row'>
                            <div className='col'>                                
                                <div className='form-group'>
                                    <label>
                                        <b>Ngày bắt đầu:</b>
                                    </label>
                                    <input type="date" id="cndb2_cndb_startdate" value={cndb2_cndb_startdate} onChange={(e) => { setcndb2_cndb_startdate(e.target.value) }} size={20}></input>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <b>Ngày kết thúc:</b>
                                    </label>
                                    <input type="date" id="cndb2_cndb_enddate" value={cndb2_cndb_enddate} onChange={(e) => { setcndb2_cndb_enddate(e.target.value) }} size={20}></input>
                                </div>  
                                <div className='form-group'>
                                    <label>
                                        <b>Lot con vật liệu:  <span style={{ color: 'blue' }}> {cndb2_m_name} </span></b>
                                        <input type="text" id="cndb2_m_lot_no" size="50" value={cndb2_m_lot_no} onChange={(e) => { setcndb2_m_lot_no(e.target.value);}} onBlur={(e) => {handleMNAME(e.target.value); }} size={20}></input>
                                    </label>
                                </div>                         
                                <div className='form-group'>
                                    <label>
                                        <b>Số CNĐB:  <span style={{ color: 'blue' }}> {checkcndb} </span> </b>
                                        <input type="text" id="cndb2_cndb_no" size="50" value={cndb2_cndb_no} onChange={(e) => { setcndb2_cndb_no(e.target.value) }} onBlur={(e) => { handlecheckCNDBNO(e.target.value); }}size={20}></input>
                                    </label>
                                </div>  
                            </div>
                            <div className='col'>
                                <div className='form-group'>
                                    <label>
                                        <b>Remark:</b>
                                        <input type="text" id="cndb2_remark" size="30" value={cndb2_remark} onChange={(e) => { setcndb2_remark(e.target.value) }} size={20}></input>
                                    </label>
                                </div>                                
                            </div>
                        </div>
                        <div className="row">
                            <div className='form-group'>
                                <button className='btn btn-primary' onClick={(e) => { handleClick(e) }}>Nhập Data</button>
                                <button className='btn btn-danger' onClick={(e) => { handleReset(e) }}>Reset Data</button>                                
                            </div>
                        </div>
                    </form>
                </div>
            </Draggable>
            <div className="pqc_dataTable">
                <h3><p>Bảng dữ liệu CNĐB</p></h3>
                <div id="pqc1_data" className="table-wrapper-scroll-y my-custom-scrollbar" >
                    Đây là bảng dữ liệu CNĐB
                    <span dangerouslySetInnerHTML={{ __html: table }}></span>
                </div>
            </div>
        </div>
    )
}

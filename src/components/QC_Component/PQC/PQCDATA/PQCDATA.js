import React, { useEffect, useState } from 'react'

import moment from 'moment';
import { getPQCDATA, get_pqc1_output_data, insertPQC1, temp_info } from '../../../../Api/Api';
import { getHTMLTABLE22 } from '../../../../Api/tableRender';
import swal from 'sweetalert';
import Draggable from 'react-draggable';
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import '../PQCDATA/PQCDATA.css'

export default function PQCDATA() {
    const [alltime,setAllTime] = useState(false);
    const [pqcdata_fromdate, setpqcdata_fromdate] = useState(moment().format("YYYY-MM-DD"));
    const [pqcdata_todate, setpqcdata_todate] = useState(moment().format("YYYY-MM-DD"));   
    const [pqcdata_factoryname, setpqcdata_factoryname] = useState('All');    
    const [pqc1_process_lot_no, setpqc1_process_lot_no] = useState('');
    const [pqcdata_customername, setpqcdata_customername] = useState('');
    const [pqcdata_gcode, setpqcdata_gcode] = useState('');
    const [pqcdata_gname, setpqcdata_gname] = useState('');
    const [pqcdata_prod_request_no, setpqcdata_prod_request_no] = useState('');  
    const [pqcdata_id, setpqcdata_id] = useState('');
    const [pqcdata_selection, setpqcdata_selection] = useState(`PQC SETTING`);   

    const [table,setTable] = useState('');


    const handleSubmit = ()=>{
        loadProgressBar();
        let queryData = {
            ALLTIME: alltime,
            FROMDATE: pqcdata_fromdate,
            TODATE: pqcdata_todate,
            FACTORY: pqcdata_factoryname=="Nhà máy 1" ? 'NM1' : pqcdata_factoryname=="Nhà máy 2" ? 'NM2': 'All',
            PROCESS_LOT_NO: pqc1_process_lot_no,
            CUST_NAME: pqcdata_customername,
            G_CODE: pqcdata_gcode,
            G_NAME_KD: pqcdata_gname,
            PROD_REQUEST_NO: pqcdata_prod_request_no,
            PQC_ID: pqcdata_id,
            SELECTION: (pqcdata_selection=="PQC SETTING")? 1 : (pqcdata_selection=="PQC CHECKSHEET")? 2: 3
         };
         console.log(queryData);
 
         getPQCDATA(queryData)
         .then(response=>{
             let Jresult = response.data;
             if(Jresult.tk_status=='OK')
             {
                 //console.log(Jresult.data);
                 setTable(getHTMLTABLE22(Jresult.data,'pqc_data_table')); 
                 swal("Thông báo","Load data thành công " + Jresult.data.length + " dòng","success");
             }
             else
             {
                console.log("k fai leader");
             }            
 
         })
         .catch(error=>{
             console.log(error);
         })
        

    }
    const handleClick=(e)=>{
        e.preventDefault();
        handleSubmit();
         
    }
    const handleReset = (e) => {
        e.preventDefault();
        setpqcdata_fromdate(moment().format("YYYY-MM-DD"));
        setpqcdata_todate(moment().format("YYYY-MM-DD"));
        setpqcdata_factoryname('');
        setpqc1_process_lot_no('');
        setpqcdata_customername('');
        setpqcdata_gcode('');
        setpqcdata_gname('');
        setpqcdata_prod_request_no('');
        setpqcdata_id(''); 
    }
    
    useEffect(()=>{
        
    },[])
    return (
        <div id="pqc1_panel">
            <Draggable>
            <div className='pqcform'>
                <h2>Form tra Data PQC</h2>                
                <form className='pqc1form'>
                    <div className='row'>
                        <div className='col'>
                            <div className="form-check">                               
                                <input type="checkbox" className="form-check-input" id="alltime" defaultChecked={alltime} onChange={() => { setAllTime(!alltime) }} />
                                <label className="form-check-label" htmlFor="checkbox"><b>Toàn thời gian</b></label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Từ ngày:</b>
                                </label>
                                <input type="date" id="pqc1_settingdate" value={pqcdata_fromdate} onChange={ (e) => { setpqcdata_fromdate(e.target.value)}} size={20}></input>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Tới ngày:</b>
                                </label>
                                <input type="date" id="pqc1_settingdate" value={pqcdata_todate} onChange={ (e) => { setpqcdata_todate(e.target.value)}} size={20}></input>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Nhà máy: </b>
                                </label>
                                <select className='form-control' id='pqc1_factory' name='pqcdata_factoryname'  onChange={ (e) => { setpqcdata_factoryname(e.target.value)}} size={1}>
                                    <option>All</option>
                                    <option>Nhà máy 1</option>
                                    <option>Nhà máy 2</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>LOT Sản xuất: <br></br><span style={{color:'blue'}}> </span> </b>
                                    <input type="text" id="pqc1_process_lot_no" size="50" value={pqc1_process_lot_no} onChange={ (e) => { setpqc1_process_lot_no(e.target.value)}}  size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Tên khách hàng:</b>
                                    <input type="text" id="pqcdata_customername" size="50" value={pqcdata_customername} onChange={ (e) => { setpqcdata_customername(e.target.value)}}  size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Code ERP CMS: </b>
                                    <input type="text" id="pqcdata_gcode" size="50" value={pqcdata_gcode} onChange={ (e) => { setpqcdata_gcode(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='form-group'>
                                <label>
                                    <b>Tên code KD: </b>
                                    <input type="text" id="pqcdata_gname"  size="30" value={pqcdata_gname} onChange={ (e) => { setpqcdata_gname(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Số YCSX: </b>
                                    <input type="text" id="pqcdata_prod_request_no"  size="30" value={pqcdata_prod_request_no} onChange={ (e) => { setpqcdata_prod_request_no(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>PQC ID</b>
                                    <input type="text" id="pqcdata_id"  size="30" value={pqcdata_id} onChange={ (e) => { setpqcdata_id(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Chọn mục tra: </b>
                                </label>
                                <select className='form-control' id='pqcdata_selection' name='pqcdata_selection'  onChange={ (e) => { setpqcdata_selection(e.target.value)}} size={1}>
                                    <option>PQC SETTING</option>
                                    <option>PQC CHECKSHEET</option>
                                    <option>PQC DEFECT</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className='form-group'>
                            <button className='btn btn-primary' onClick={(e)=>{handleClick(e)}}>Tra Data</button>  
                            <button className='btn btn-danger' onClick={(e)=>{handleReset(e)}}>Reset Data</button>                           
                        </div>
                    </div>
                </form>
            </div>
            </Draggable>
            <div className = "pqc_dataTable">
                <h3><p>Bảng dữ liệu setting PQC</p></h3>
                <div id="pqc1_data" className="table-wrapper-scroll-y my-custom-scrollbar" >
                    Đây là dữ liệu PQC Setting
                    <span  dangerouslySetInnerHTML={{__html: table}}></span>
                </div>
            </div>
           
            
        </div>
    )
}

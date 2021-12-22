import React, { useEffect, useState } from 'react'
import '../PQC2/PQC2.css'
import moment from 'moment';
import { get_pqc2_output_data } from '../../../../Api/Api';
import { getHTMLTABLE22 } from '../../../../Api/tableRender';
import DataGrid from 'react-data-grid'
import { readingTable } from '../../../../jq';


export default function PQC2() {
    const [pqc2_settingdate, setpqc2_settingdate] = useState(moment().format("YYYY-MM-DD"));    
    const [pqc2_process_lot_no, setpqc2_process_lot_no] = useState('');
    const [pqc2_lineqc_empl_no, setpqc2_lineqc_empl_no] = useState('');
    const [pqc2_pqc1_ID, setpqc2_pqc1_ID] = useState('');  

    const [table,setTable] = useState('');

    const handleClick=(e)=>{
        e.preventDefault();
         console.log(pqc2_settingdate);        
        console.log(pqc2_process_lot_no);
        console.log(pqc2_lineqc_empl_no);
        console.log(pqc2_pqc1_ID);
    }

    const handleReset = (e) => {
        e.preventDefault();
        setpqc2_settingdate(moment().format("YYYY-MM-DD"));        
        setpqc2_process_lot_no('');
        setpqc2_lineqc_empl_no('');
        setpqc2_pqc1_ID('');    
    }
    const handleGetpqc2Data = ()=>{
        get_pqc2_output_data()
        .then(response=>{
            let Jresult = response.data;
            if(Jresult.tk_status=='OK')
            {
                setTable(getHTMLTABLE22(JSON.parse(Jresult.data),'pqc_data_table'));
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
    
    const handleReadTable = (e)=>{
        e.preventDefault();
        readingTable('pqc_data_table');
    }
    useEffect(()=>{
        handleGetpqc2Data();
    },[])
    return (
        <div id="pqc2_panel">
            <div className='pqcform'>
                <h2><p>Form nhập thông tin Checksheet PQC</p></h2>
                <form>
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label>
                                    <b>Ngày kiểm tra:</b>
                                </label>
                                <input type="date" id="pqc2_settingdate" value={pqc2_settingdate} onChange={ (e) => { setpqc2_settingdate(e.target.value)}}></input>
                            </div>
                            
                            <div className='form-group'>
                                <label>
                                    <b>LOT Sản xuất: </b>
                                    <input type="text" id="pqc2_process_lot_no" size="50" value={pqc2_process_lot_no} onChange={ (e) => { setpqc2_process_lot_no(e.target.value)}}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Mã LineQC: </b>
                                    <input type="text" id="pqc2_lineqc_empl_no" size="50" value={pqc2_lineqc_empl_no} onChange={ (e) => { setpqc2_lineqc_empl_no(e.target.value)}}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>ID Setting: </b>
                                    <input type="text" id="pqc2_pqc1_ID" size="50" value={pqc2_pqc1_ID} onChange={ (e) => { setpqc2_pqc1_ID(e.target.value)}}></input>
                                </label>
                            </div>
                        </div>                    
                    </div>
                    <div className="row">
                        <div className='form-group'>
                            <button className='btn btn-primary' onClick={(e)=>{handleClick(e)}}>Nhập Data</button>
                            <button className='btn btn-danger' onClick={(e)=>{handleReadTable(e)}}>Reset Data</button>
                        </div>
                    </div>
                </form>
            </div>
            
            <div className="pqc_dataTable">
                <h3><p>Bảng dữ liệu setting PQC</p></h3>
                <div id="pqc2_data" className="table-wrapper-scroll-y my-custom-scrollbar" >
                    Đây là dữ liệu PQC Setting
                    <span  dangerouslySetInnerHTML={{__html: table}}></span>
                </div>
            </div>
            
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import '../PQC2/PQC2.css'
import moment from 'moment';
import { getPQC1ID, get_pqc2_output_data, insertPQC2, temp_info } from '../../../../Api/Api';
import { getHTMLTABLE22 } from '../../../../Api/tableRender';
import { addColumnTable, addRowTable, clickVaoday, doubleClickCell, readingTable } from '../../../../jq';
import swal from 'sweetalert';
import { converttoDateTimefromTime } from '../../../../Api/GlobalFunctions';
import Draggable from 'react-draggable';
import FormButton from '../../FormButton/FormButton';

export default function PQC2() {
    const [pqc2_settingdate, setpqc2_settingdate] = useState(moment().format("YYYY-MM-DD"));    
    const [pqc2_process_lot_no, setpqc2_process_lot_no] = useState('');
    const [pqc2_lineqc_empl_no, setpqc2_lineqc_empl_no] = useState('');
    const [pqc2_pqc1_ID, setpqc2_pqc1_ID] = useState(''); 
    const [pqc2_checksheet_result, setpqc2_checksheet_result] = useState(''); 
    const [pqc2_checksheet_result_array, setpqc2_checksheet_result_array] = useState(''); 
    const [pqc2_remark,setpqc2_remark] = useState('');
    const [table,setTable] = useState('');

    const [gname, setGName] = useState('');
    const [pqc2_lineqc_empl_name, setPqc2LineQCEmplName] = useState('');


    
    const handleCheckSheetResult = (rawinput) =>{
        const checksheetArray = rawinput.split(',');
        //console.log(checksheetArray);
        if(checksheetArray.length < 6 && rawinput.length>0)
        {
            swal("Cảnh báo","Phải nhập đủ thông tin checksheet ngăn cách bằng dấu phảy","error");
        }
        else
        {
            const checksheetObject = {
                TIME1: (checksheetArray[0]=='') ? '1900-01-01 00:00:00' : converttoDateTimefromTime(pqc2_settingdate,checksheetArray[0]),
                TIME2:  (checksheetArray[1]=='') ? '1900-01-01 00:00:00' : converttoDateTimefromTime(pqc2_settingdate,checksheetArray[1]),
                TIME3:  (checksheetArray[2]=='') ? '1900-01-01 00:00:00' : converttoDateTimefromTime(pqc2_settingdate,checksheetArray[2]),
                CHECK1: (checksheetArray[3]=='1') ? 'OK' : (checksheetArray[3]=='0') ? 'NG' : '',
                CHECK2: (checksheetArray[4]=='1') ? 'OK' : (checksheetArray[4]=='0') ? 'NG' : '',
                CHECK3: (checksheetArray[5]=='1') ? 'OK' : (checksheetArray[5]=='0') ? 'NG' : '',
            }
            setpqc2_checksheet_result_array(checksheetObject);
            //console.log(checksheetObject);
        }
    }
    const handle_temp_info =  (param, option) =>
    {        
        switch(option)
        {
            case 'pqc2_lineqc_empl_name':
                temp_info(param,'empl_name')
                .then(response=>{
                    //console.log(response.data.data);
                    console.log(JSON.parse(response.data.data)[0].EMPL_NAME);
                    setPqc2LineQCEmplName(JSON.parse(response.data.data)[0].EMPL_NAME);
                })
                .catch(error=>{
                    console.log(error);
                    setPqc2LineQCEmplName('');
                });
            break;          

            case 'gname':
                temp_info(param,'gname')
                .then(response=>{
                    console.log(JSON.parse(response.data.data)[0].G_NAME);
                    setGName(JSON.parse(response.data.data)[0].G_NAME);
                })
                .catch(error=>{
                    console.log(error);
                    setGName('');
                });
            break;
            default:

        }

    }


    const handleGetPQC1ID = (lineqc_no, process_lot_no) => {

        if (lineqc_no == "" || process_lot_no == "") {

        }
        else {
            getPQC1ID(lineqc_no, process_lot_no)
                .then(response => {
                    //console.log(response);
                    let result = response.data;
                    if (result.tk_status == "OK") {
                        //console.log(result.data[0].PQC1_ID);
                        setpqc2_pqc1_ID(result.data[0].PQC1_ID);
                    }
                    else {

                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    const handleClick=(e)=>{
        e.preventDefault();
        let insertData = {
            PROCESS_LOT_NO: pqc2_process_lot_no,
            LINEQC_PIC: pqc2_lineqc_empl_no,
            PQC1_ID : pqc2_pqc1_ID,
            CHECKSHEET: pqc2_checksheet_result_array,
            REMARK: pqc2_remark
        };
        insertPQC2(insertData)
        .then(response=>{
            let result = response.data;
            if(result.tk_status=="OK")
            {
                swal("Thông báo","Nhập data thành công","success");
                handleGetpqc2Data();
            }
            else{
                swal("Lỗi","Nhập data thất bại: " + result.message,"error");
            }
        })
        .catch(error=>{
            console.log(error);
        })
        console.log(insertData);
     
    }
    const handleReset = (e) => {
        e.preventDefault();
        setpqc2_settingdate(moment().format("YYYY-MM-DD"));        
        setpqc2_process_lot_no(''); 
        setpqc2_lineqc_empl_no('');
        setpqc2_pqc1_ID('');
        setpqc2_checksheet_result('');
        setpqc2_checksheet_result_array('');
        setpqc2_remark('');
        setGName('');
        setPqc2LineQCEmplName('');
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
        //addRowTable('pqc_data_table',"datacell");
        //addColumnTable('pqc_data_table',0,'Cot_moi','gia tri');
    }
  
    useEffect(()=>{
        handleGetpqc2Data();
        //clickVaoday();
        //doubleClickCell();
    },[])
    return (
        <div id="pqc2_panel">
            <FormButton/>
            <Draggable>
            <div className='pqcform'>
                <h5>Form nhập thông tin Checksheet PQC</h5>
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
                                    <b>LOT Sản xuất: <span style={{color:'blue'}}>{gname} </span></b>
                                    <input type="text" id="pqc2_process_lot_no" value={pqc2_process_lot_no} onChange={ (e) => { setpqc2_process_lot_no(e.target.value)}} onBlur={(e)=>{ handleGetPQC1ID(pqc2_lineqc_empl_no,pqc2_process_lot_no); handle_temp_info(e.target.value,'gname');}} ></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Mã LineQC: <span style={{color:'blue'}}>{pqc2_lineqc_empl_name} </span></b>
                                    <input type="text" id="pqc2_lineqc_empl_no"  value={pqc2_lineqc_empl_no} onChange={ (e) => { setpqc2_lineqc_empl_no(e.target.value)}} onBlur={(e)=>{ handleGetPQC1ID(pqc2_lineqc_empl_no,pqc2_process_lot_no); handle_temp_info(e.target.value,'pqc2_lineqc_empl_name');}}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>ID Setting: </b>
                                    <input type="text" id="pqc2_pqc1_ID"  value={pqc2_pqc1_ID} onChange={ (e) => { setpqc2_pqc1_ID(e.target.value)}}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Kết quả checksheet: Định dạng "1310,1520,1745,1,0,1" </b>
                                    <input type="text" id="pqc2_checksheet_result"  value={pqc2_checksheet_result} onChange={ (e) => { setpqc2_checksheet_result(e.target.value)}} onBlur={ (e) => { handleCheckSheetResult(pqc2_checksheet_result)}}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Nội dung ghi chú </b>
                                    <input type="text" id="pqc2_remark"  value={pqc2_remark} onChange={ (e) => { setpqc2_remark(e.target.value)}}></input>
                                </label>
                            </div>
                        </div>                    
                    </div>
                    <div className="row">
                        <div className='form-group'>
                            <button className='btn btn-primary' onClick={(e)=>{handleClick(e)}}>Nhập Data</button>
                            <button className='btn btn-danger' onClick={(e)=>{ handleReset(e)  }}>Reset Data</button>
                        </div>
                    </div>
                </form>
            </div>
            </Draggable>
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

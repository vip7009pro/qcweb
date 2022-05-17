import React, { useEffect, useState } from 'react'
import '../PQC3/PQC3.css'
import moment from 'moment';
import { getPQC1ID, get_pqc3_output_data, insertPQC3,  temp_info } from '../../../../Api/Api';
import { getHTMLTABLE22 } from '../../../../Api/tableRender';
import swal from 'sweetalert';
import { modifyColumn, readingTable, updateColumn } from '../../../../jq';
import Draggable from 'react-draggable';
import FormButton from '../../FormButton/FormButton';


export default function PQC3() {
    const [pqc3_proddate, setpqc3_proddate] = useState(moment().format("YYYY-MM-DD"));
    const [pqc3_ng_qty, setpqc3_ng_qty] = useState('');
    const [pqc3_process_lot_no, setpqc3_process_lot_no] = useState('');
    const [pqc3_lineqc_empl_no, setpqc3_lineqc_empl_no] = useState('');
    const [pqc3_inspect_qty, setpqc3_inspect_qty] = useState('');
    const [pqc3_pqc1id, setpqc3_pqc1id] = useState('');
    const [pqc3_defect_content, setpqc3_defect_content] = useState('');
    const [pqc3_occur_time, setpqc3_occur_time] = useState('');
    const [pqc3_defect_image, setpqc3_defect_image] = useState('');
    const [pqc3_remark, setpqc3_remark] = useState('');
    const [gname, setGName] = useState('');
    const [pqc3_lineqc_empl_name, setpqc3LineQCEmplName] = useState('');
    const [table,setTable] = useState('');

    const handleGetPQC1ID = (lineqc_no, process_lot_no) => {
        console.log("vao handle get pqc1 id");
        console.log(lineqc_no);
        console.log(process_lot_no);

        if (lineqc_no == "" || process_lot_no == "") {

        }
        else {
            getPQC1ID(lineqc_no, process_lot_no)
                .then(response => {
                    //console.log(response);
                    let result = response.data;
                    if (result.tk_status == "OK") {
                        //console.log(result.data[0].PQC1_ID);
                        console.log(result.data[0].PQC1_ID);
                        setpqc3_pqc1id(result.data[0].PQC1_ID);
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
         let insertdata = {   
            PROCESS_LOT_NO: pqc3_process_lot_no,
            LINEQC_PIC: pqc3_lineqc_empl_no,        
            OCCURR_TIME: pqc3_proddate + " " + pqc3_occur_time.substring(0,2)+":"+ pqc3_occur_time.substring(2,4),     
            INSPECT_QTY: pqc3_inspect_qty,
            DEFECT_QTY: pqc3_ng_qty,
            DEFECT_PHENOMENON: pqc3_defect_content,
            DEFECT_IMAGE_LINK: pqc3_defect_image,
            REMARK: pqc3_remark,
            PQC1_ID: pqc3_pqc1id
        };
        insertPQC3(insertdata)
        .then(response=>{
            let Jresult = response.data;
            if(Jresult.tk_status=='OK')
            {
                swal("Chúc mừng","Nhập data thành công","success");
                handleGetpqc3Data();
            }
            else
            {
                swal("Lỗi",Jresult.message,"error");
            }

        })
        .catch(error=>{
            console.log(error);
        });

        /* console.log(pqc3_proddate);        
        console.log(pqc3_process_lot_no);
        console.log(pqc3_lineqc_empl_no);        
        console.log(pqc3_occur_time.substring(0,2)+":"+ pqc3_occur_time.substring(2,4)); */
     
    }
    const handleReset = (e) => {
        e.preventDefault();
        setpqc3_proddate(moment().format("YYYY-MM-DD"));
        setpqc3_ng_qty('  ');
        setpqc3_process_lot_no('  ');
        setpqc3_lineqc_empl_no('  ');
        setpqc3_inspect_qty(' ');
        setpqc3_pqc1id('  ');
        setpqc3_defect_content('  ');
        setpqc3_occur_time('  ');
        setpqc3_defect_image('');
        setpqc3_remark('  ');
        setGName('');
        setpqc3LineQCEmplName('');       
    }
    const handleGetpqc3Data = ()=>{
        get_pqc3_output_data()
        .then(response=>{
            let Jresult = response.data;
            console.log(Jresult.data);
            if(Jresult.tk_status=='OK')
            {
                setTable(getHTMLTABLE22(Jresult.data,'pqc_data_table'));    
                modifyColumn('pqc_data_table',12);
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
    const handle_temp_info =  (param, option) =>
    {        
        switch(option)
        {
            case 'pqc3_lineqc_empl_name':
                temp_info(param,'empl_name')
                .then(response=>{
                    //console.log(response.data.data);
                    setpqc3LineQCEmplName(JSON.parse(response.data.data)[0].EMPL_NAME);
                })
                .catch(error=>{
                    console.log(error);
                    setpqc3LineQCEmplName('');
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

    const handleUpdate = (e)=>{
        e.preventDefault();
        updateColumn('pqc_data_table',12);
    }
    useEffect(()=>{
        handleGetpqc3Data();
    },[])
    return (
        <div id="pqc3_panel">
            <FormButton/>
            <Draggable>
            <div className='pqcform'>
                <h2>Form nhập thông tin lỗi công đoạn PQC</h2>                
                <form className='pqc3form'>
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label>
                                    <b>Ngày kiểm tra:</b>
                                </label>
                                <input type="date" id="pqc3_proddate" value={pqc3_proddate} onChange={ (e) => {setpqc3_proddate(e.target.value)}} size={20}></input>
                            </div>                           
                            <div className='form-group'>
                                <label>
                                    <b>LOT Sản xuất: <br></br><span style={{color:'blue'}}>{gname} </span> </b>
                                    <input type="text" id="pqc3_process_lot_no" size="50" value={pqc3_process_lot_no} onChange={ (e) => { setpqc3_process_lot_no(e.target.value)}} onBlur={(e)=>{handle_temp_info(e.target.value,'gname'); handleGetPQC1ID(pqc3_lineqc_empl_no,pqc3_process_lot_no);}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Mã LineQC: <span style={{color:'blue'}}> {pqc3_lineqc_empl_name} </span> </b>
                                    <input type="text" id="pqc3_lineqc_empl_no" size="50" value={pqc3_lineqc_empl_no} onChange={ (e) => { setpqc3_lineqc_empl_no(e.target.value)}} onBlur={(e)=>{handle_temp_info(e.target.value,'pqc3_lineqc_empl_name'); handleGetPQC1ID(pqc3_lineqc_empl_no,pqc3_process_lot_no);}} size={20}></input>
                                </label>
                            </div>                           
                        </div>
                        <div className='col'>
                            <div className='form-group'>
                                <label>
                                    <b>Thời gian phát sinh: 15h30p viết là 1530</b>
                                    <input type="text" id="pqc3_occur_time"  size="30" value={pqc3_occur_time} onChange={ (e) => { setpqc3_occur_time(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Số lượng NG:</b>
                                    <input type="text" id="pqc3_ng_qty"  size="30" value={pqc3_ng_qty} onChange={ (e) => { setpqc3_ng_qty(e.target.value)}}  size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Số lượng bóc kiểm tra: </b>
                                    <input type="text" id="pqc3_inspect_qty" size="30" value={pqc3_inspect_qty} onChange={ (e) => { setpqc3_inspect_qty(e.target.value)}}  size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>ID Setting: </b>
                                    <input type="text" id="pqc3_pqc1id" size="30" value={pqc3_pqc1id} onChange={ (e) => { setpqc3_pqc1id(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Nội dung lỗi: </b>
                                    <input type="text" id="pqc3_leadersx_empl_no" size="30" value={pqc3_defect_content} onChange={ (e) => { setpqc3_defect_content(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Link hình ảnh:</b>
                                    <input type="text" id="pqc3_defect_image" size="30" value={pqc3_defect_image} onChange={ (e) => { setpqc3_defect_image(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Ghi chú:</b>
                                    <input type="text" id="pqc3_remark" size="30" value={pqc3_remark} onChange={ (e) => { setpqc3_remark(e.target.value)}}  size={20}></input>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className='form-group'>
                            <button className='btn btn-primary' onClick={(e)=>{handleClick(e)}}>Nhập Data</button>
                            <button className='btn btn-danger' onClick={(e)=>{handleReset(e)}}>Reset Data</button>                         
                        </div>
                    </div>
                </form>
            </div>
            </Draggable>            
            <div className = "pqc_dataTable">
                <h3><p>Bảng dữ liệu lỗi công đoạn PQC</p></h3>
                <div id="pqc3_data" className="table-wrapper-scroll-y my-custom-scrollbar" >
                    Đây là dữ liệu lỗi công đoạn PQC
                    <span  dangerouslySetInnerHTML={{__html: table}}></span>
                </div>
            </div>
            
        </div>
    )
}

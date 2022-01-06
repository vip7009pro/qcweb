import React, { useEffect, useState } from 'react'
import '../PQC1/PQC1.css'
import moment from 'moment';
import { checkKTDTC, get_pqc1_output_data, insertPQC1, temp_info } from '../../../../Api/Api';
import { getHTMLTABLE22 } from '../../../../Api/tableRender';
import swal from 'sweetalert';
import { modifyColumn, readingTable, updateColumn } from '../../../../jq';
import Draggable from 'react-draggable';

export default function PQC1() {
    const [pqc1_settingdate, setpqc1_settingdate] = useState(moment().format("YYYY-MM-DD"));
    const [pqc1_factoryname, setpqc1_factoryname] = useState('Nhà máy 1');
    const [pqc1_process_lot_no, setpqc1_process_lot_no] = useState('');
    const [pqc1_lineqc_empl_no, setpqc1_lineqc_empl_no] = useState('');
    const [pqc1_machine_no, setpqc1_machine_no] = useState('');
    const [pqc1_step_no, setpqc1_step_no] = useState('');
    const [pqc1_cavity_no, setpqc1_cavity_no] = useState('');
    const [pqc1_setting_ok, setpqc1_setting_ok] = useState('');
    const [pqc1_sx_empl_no, setpqc1_sx_empl_no] = useState('');
    const [pqc1_leadersx_empl_no, setpqc1_leadersx_empl_no] = useState('');
    const [gname, setGName] = useState('');
    const [pqc1_lineqc_empl_name, setPqc1LineQCEmplName] = useState('');
    const [pqc1_sx_empl_name, setPqc1SxEmplName] = useState('');
    const [pqc1_leader_sx_empl_name, setPqc1LeaderSxEmplName] = useState('');
    const [ktdtc,setKTDTC] = useState('DKT');
    const [table,setTable] = useState('');

    const handleClick=(e)=>{
        e.preventDefault();
         let insertdata = {
            PROCESS_LOT_NO: pqc1_process_lot_no,
            LINEQC_PIC: pqc1_lineqc_empl_no,
            PROD_PIC: pqc1_sx_empl_no,
            PROD_LEADER: pqc1_leadersx_empl_no,
            LINE_NO: pqc1_machine_no,
            STEPS: pqc1_step_no,
            CAVITY: pqc1_cavity_no,
            SETTING_OK_TIME: pqc1_settingdate + " " + pqc1_setting_ok.substring(0,2)+":"+ pqc1_setting_ok.substring(2,4),
            FACTORY: pqc1_factoryname=="Nhà máy 1" ? 'NM1' : 'NM2',                    
            REMARK: ktdtc
        };
        insertPQC1(insertdata)
        .then(response=>{
            let Jresult = response.data;
            if(Jresult.tk_status=='OK')
            {
                swal("Chúc mừng","Nhập data thành công","success");
                handleGetPQC1Data();
            }
            else
            {
                swal("Lỗi",Jresult.message,"error");
            }

        })
        .catch(error=>{
            console.log(error);
        }) 
        console.log(pqc1_settingdate);
        console.log(pqc1_factoryname);
        console.log(pqc1_process_lot_no);
        console.log(pqc1_lineqc_empl_no);
        console.log(pqc1_machine_no);
        console.log(pqc1_step_no);
        console.log(pqc1_cavity_no);
        console.log(pqc1_setting_ok.substring(0,2)+":"+ pqc1_setting_ok.substring(2,4));
        console.log(pqc1_sx_empl_no);
        console.log(pqc1_leadersx_empl_no); 

    }
    const handleReset = (e) => {
        e.preventDefault();
        setpqc1_settingdate(moment().format("YYYY-MM-DD"));
        setpqc1_factoryname('');
        setpqc1_process_lot_no('');
        setpqc1_lineqc_empl_no('');
        setpqc1_machine_no('');
        setpqc1_step_no('');
        setpqc1_cavity_no('');
        setpqc1_setting_ok('');
        setpqc1_sx_empl_no('');
        setpqc1_leadersx_empl_no('');
        setKTDTC('DKT');
    }
    const handlecheckKTDTC = (lotsx) => {
        console.log("vao check dtc");
        const queryData = {
            PROCESS_LOT_NO: lotsx
        }
        checkKTDTC(queryData)
        .then(response=>{
            let Jresult = response.data;
            if(Jresult.tk_status=='OK')
            {
                //console.log(Jresult.data[0].TRANGTHAI);
                if(Jresult.data[0].TRANGTHAI)                
                setKTDTC('DKT');  
            }
            else
            {
                console.log("k fai leader");
                setKTDTC('CKT');
            }
            

        })
        .catch(error=>{
            console.log(error);
        })
    }
    const handleGetPQC1Data = ()=>{
        get_pqc1_output_data()
        .then(response=>{
            let Jresult = response.data;
            if(Jresult.tk_status=='OK')
            {
                setTable(getHTMLTABLE22(JSON.parse(Jresult.data),'pqc_data_table'));    
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
            case 'pqc1_lineqc_empl_name':
                temp_info(param,'empl_name')
                .then(response=>{
                    console.log(response.data.data);
                    setPqc1LineQCEmplName(JSON.parse(response.data.data)[0].EMPL_NAME);
                })
                .catch(error=>{
                    console.log(error);
                    setPqc1LineQCEmplName('');
                });
            break;

            case 'pqc1_sx_empl_name':
                temp_info(param,'empl_name')
                .then(response=>{
                    console.log(response.data.data);
                    setPqc1SxEmplName(JSON.parse(response.data.data)[0].EMPL_NAME);
                })
                .catch(error=>{
                    console.log(error);
                    setPqc1SxEmplName('');
                });

            break;

            case 'pqc1_leader_sx_empl_name':
                temp_info(param,'empl_name')
                .then(response=>{
                    console.log(response.data.data);
                    setPqc1LeaderSxEmplName(JSON.parse(response.data.data)[0].EMPL_NAME);
                })
                .catch(error=>{
                    console.log(error);
                    setPqc1LeaderSxEmplName('');
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
        handleGetPQC1Data();
    },[])
    return (
        <div id="pqc1_panel">
            <Draggable>
            <div className='pqcform'>
                <h2>Form nhập thông tin Setting PQC</h2>
                
                <form className='pqc1form'>
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label>
                                    <b>Ngày kiểm tra:</b>
                                </label>
                                <input type="date" id="pqc1_settingdate" value={pqc1_settingdate} onChange={ (e) => { setpqc1_settingdate(e.target.value)}} size={20}></input>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Nhà máy: </b>
                                </label>
                                <select className='form-control' id='pqc1_factory' name='pqc1_factoryname'  onChange={ (e) => { setpqc1_factoryname(e.target.value)}} size={1}>
                                    <option>Nhà máy 1</option>
                                    <option>Nhà máy 2</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>LOT Sản xuất: <br></br><span style={{color:'blue'}}>{gname} </span> </b>
                                    <input type="text" id="pqc1_process_lot_no" size="50" value={pqc1_process_lot_no} onChange={ (e) => { setpqc1_process_lot_no(e.target.value)}} onBlur={(e)=>{handle_temp_info(e.target.value,'gname'); handlecheckKTDTC(e.target.value);}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Mã LineQC: <span style={{color:'blue'}}> {pqc1_lineqc_empl_name} </span> </b>
                                    <input type="text" id="pqc1_lineqc_empl_no" size="50" value={pqc1_lineqc_empl_no} onChange={ (e) => { setpqc1_lineqc_empl_no(e.target.value)}} onBlur={(e)=>{handle_temp_info(e.target.value,'pqc1_lineqc_empl_name')}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Số máy: </b>
                                    <input type="text" id="pqc1_machine_no" size="50" value={pqc1_machine_no} onChange={ (e) => { setpqc1_machine_no(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='form-group'>
                                <label>
                                    <b>Số bước: </b>
                                    <input type="text" id="pqc1_step_no"  size="30" value={pqc1_step_no} onChange={ (e) => { setpqc1_step_no(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Số Cavity: </b>
                                    <input type="text" id="pqc1_cavity_no"  size="30" value={pqc1_cavity_no} onChange={ (e) => { setpqc1_cavity_no(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Thời gian setting OK: 15h30p viết là 1530</b>
                                    <input type="text" id="pqc1_setting_ok"  size="30" value={pqc1_setting_ok} onChange={ (e) => { setpqc1_setting_ok(e.target.value)}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Mã CNSX: <span style={{color:'blue'}}>{pqc1_sx_empl_name}</span></b>
                                    <input type="text" id="pqc1_sx_empl_no"  size="30" value={pqc1_sx_empl_no} onChange={ (e) => { setpqc1_sx_empl_no(e.target.value)}} onBlur={(e)=>{handle_temp_info(e.target.value,'pqc1_sx_empl_name')}} size={20}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Mã LeaderSX: <span style={{color:'blue'}}>{pqc1_leader_sx_empl_name}</span></b>
                                    <input type="text" id="pqc1_leadersx_empl_no" size="30" value={pqc1_leadersx_empl_no} onChange={ (e) => { setpqc1_leadersx_empl_no(e.target.value)}} onBlur={(e)=>{handle_temp_info(e.target.value,'pqc1_leader_sx_empl_name')}} size={20}></input>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className='form-group'>
                            <button className='btn btn-primary' onClick={(e)=>{handleClick(e)}}>Nhập Data</button>
                            <button className='btn btn-danger' onClick={(e)=>{handleReset(e)}}>Reset Data</button>
                            <button className='btn btn-info' onClick={(e)=>{handleUpdate(e)}}>Update Data</button>
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

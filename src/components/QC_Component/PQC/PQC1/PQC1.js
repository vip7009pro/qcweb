import React, { useEffect, useState } from 'react'
import '../PQC1/PQC1.css'
import moment from 'moment';
import { get_pqc1_output_data } from '../../../../Api/Api';
import { getHTMLTABLE22 } from '../../../../Api/tableRender';


export default function PQC1() {
    const [pqc1_settingdate, setpqc1_settingdate] = useState(moment().format("YYYY-MM-DD"));
    const [pqc1_factoryname, setpqc1_factoryname] = useState('');
    const [pqc1_process_lot_no, setpqc1_process_lot_no] = useState('');
    const [pqc1_lineqc_empl_no, setpqc1_lineqc_empl_no] = useState('');
    const [pqc1_machine_no, setpqc1_machine_no] = useState('');
    const [pqc1_step_no, setpqc1_step_no] = useState('');
    const [pqc1_cavity_no, setpqc1_cavity_no] = useState('');
    const [pqc1_setting_ok, setpqc1_setting_ok] = useState('');
    const [pqc1_sx_empl_no, setpqc1_sx_empl_no] = useState('');
    const [pqc1_leadersx_empl_no, setpqc1_leadersx_empl_no] = useState('');

    const [table,setTable] = useState('');

    const handleClick=(e)=>{
        e.preventDefault();
        console.log(pqc1_settingdate);
        console.log(pqc1_factoryname);
        console.log(pqc1_process_lot_no);
        console.log(pqc1_lineqc_empl_no);
        console.log(pqc1_machine_no);
        console.log(pqc1_step_no);
        console.log(pqc1_cavity_no);
        console.log(pqc1_setting_ok);
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
    }
    const handleGetPQC1Data = ()=>{
        get_pqc1_output_data()
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

    useEffect(()=>{
        handleGetPQC1Data();
    },[])
    return (
        <div id="pqc1_panel">
            <div className='pqcform'>
                <h2><p>Form nhập thông tin Setting PQC</p></h2>
                <form>
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label>
                                    <b>Ngày kiểm tra:</b>
                                </label>
                                <input type="date" id="pqc1_settingdate" value={pqc1_settingdate} onChange={ (e) => { setpqc1_settingdate(e.target.value)}}></input>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Nhà máy: </b>
                                </label>
                                <select className='form-control' id='pqc1_factory' name='pqc1_factoryname'  onChange={ (e) => { setpqc1_factoryname(e.target.value)}}>
                                    <option>Nhà máy 1</option>
                                    <option>Nhà máy 2</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>LOT Sản xuất: </b>
                                    <input type="text" id="pqc1_process_lot_no" size="50" value={pqc1_process_lot_no} onChange={ (e) => { setpqc1_process_lot_no(e.target.value)}}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Mã LineQC: </b>
                                    <input type="text" id="pqc1_lineqc_empl_no" size="50" value={pqc1_lineqc_empl_no} onChange={ (e) => { setpqc1_lineqc_empl_no(e.target.value)}}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Số máy: </b>
                                    <input type="text" id="pqc1_machine_no" size="50" value={pqc1_machine_no} onChange={ (e) => { setpqc1_machine_no(e.target.value)}}></input>
                                </label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='form-group'>
                                <label>
                                    <b>Số bước: </b>
                                    <input type="text" id="pqc1_step_no"  size="30" value={pqc1_step_no} onChange={ (e) => { setpqc1_step_no(e.target.value)}}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Số Cavity: </b>
                                    <input type="text" id="pqc1_cavity_no"  size="30" value={pqc1_cavity_no} onChange={ (e) => { setpqc1_cavity_no(e.target.value)}}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Thời gian setting OK: </b>
                                    <input type="text" id="pqc1_setting_ok"  size="30" value={pqc1_setting_ok} onChange={ (e) => { setpqc1_setting_ok(e.target.value)}}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Mã CNSX: </b>
                                    <input type="text" id="pqc1_sx_empl_no"  size="30" value={pqc1_sx_empl_no} onChange={ (e) => { setpqc1_sx_empl_no(e.target.value)}}></input>
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <b>Mã LeaderSX: </b>
                                    <input type="text" id="pqc1_leadersx_empl_no" size="30" value={pqc1_leadersx_empl_no} onChange={ (e) => { setpqc1_leadersx_empl_no(e.target.value)}}></input>
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

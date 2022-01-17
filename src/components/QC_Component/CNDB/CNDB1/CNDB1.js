import React, { useEffect, useState } from 'react'
import '../CNDB1/CNDB1.css'
import moment from 'moment';
import { generalQuery, get_pqc1_output_data, insertPQC1, temp_info } from '../../../../Api/Api';
import { getHTMLTABLE22 } from '../../../../Api/tableRender';
import swal from 'sweetalert';
import { keydowninput, modifyColumn, readingTable, updateColumn } from '../../../../jq';
import Draggable from 'react-draggable';
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
export default function CNDB1() {
    const [cndb1_cndb_date, setcndb1_cndb_date] = useState(moment().format("YYYY-MM-DD"));    
    const [cndb1_cndb_no, setcndb1_cndb_no] = useState('');
    const [cndb1_reg_empl_no, setcndb1_reg_empl_no] = useState('');
    const [cndb1_m_name, setcndb1_m_name] = useState('');
    const [cndb1_m_name_list,setcndb1_m_name_list]= useState('');
    const [cndb1_defect_name, setcndb1_defect_name] = useState('');
    const [cndb1_defect_content, setcndb1_defect_content] = useState('');
    const [cndb1_remark, setcndb1_remark] = useState('');    
    const [pqc1_leadersx_empl_no, setpqc1_leadersx_empl_no] = useState('');
    const [gname, setGName] = useState('');
    const [cndb1_reg_empl_name, setPqc1LineQCEmplName] = useState('');   
    const [table, setTable] = useState('');

    const encodeCNDBNO = (cndbno)=>{
        //220110-1
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
    const renderMNAMEList = (mnamelist)=>
    {
        const mnamearray = mnamelist.map((element,index) =>
            //return element.M_NAME;
            <option key={index} value= {element.M_NAME} />
        )    
        setcndb1_m_name_list(mnamearray);
        //console.log(mnamearray);
    }
    const handleMNAME = ()=>{
        let insertdata = {
            M_NAME: cndb1_m_name
        };
        generalQuery('checkMNAME',insertdata)
        .then(response => {
            let Jresult = response.data;
            if (Jresult.tk_status == 'OK') {
                //console.log(Jresult.data);  
                renderMNAMEList(Jresult.data);              
                
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
        
        let insertdata = {
            CNDB_DATE: cndb1_cndb_date,
            CNDB_NO: cndb1_cndb_no,            
            CNDB_ENCODE: encodeCNDBNO(cndb1_cndb_no),
            M_NAME: cndb1_m_name,
            DEFECT_NAME: cndb1_defect_name,
            DEFECT_CONTENT: cndb1_defect_content,
            REG_EMPL_NO: cndb1_reg_empl_no,                   
            REMARK: cndb1_remark
        };
        generalQuery('insertcndb1data',insertdata)
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
    const handleReset = (e) => {
        e.preventDefault();
        setcndb1_cndb_date(moment().format("YYYY-MM-DD"));        
        setcndb1_cndb_no('');
        setcndb1_reg_empl_no('');
        setcndb1_m_name('');
        setcndb1_defect_name('');
        setcndb1_defect_content('');
        setcndb1_remark('');        
        setpqc1_leadersx_empl_no('');        
    }    
    const handleGetCNDBData = () => {
        let insertdata={

        }
        generalQuery('getcndb1data',insertdata)
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
    const handle_temp_info = (param, option) => {
        switch (option) {
            case 'cndb1_reg_empl_name':
                temp_info(param, 'empl_name')
                    .then(response => {
                        //console.log(response.data.data);
                        setPqc1LineQCEmplName(JSON.parse(response.data.data)[0].EMPL_NAME);
                    })
                    .catch(error => {
                        console.log(error);
                        setPqc1LineQCEmplName('');
                    });
                break;
            case 'gname':
                temp_info(param, 'gname')
                    .then(response => {
                        console.log(JSON.parse(response.data.data)[0].G_NAME);
                        setGName(JSON.parse(response.data.data)[0].G_NAME);
                    })
                    .catch(error => {
                        console.log(error);
                        setGName('');
                    });
                break;
            default:
        }
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        //updateColumn('pqc_data_table', 12);
    }
    useEffect(() => {
        handleGetCNDBData();
    }, [])
    return (
        <div id="pqc1_panel">            
                <div className='pqcform'>
                    <h2>Form đăng ký CNĐB</h2>
                    <form className='pqc1form'>
                        <div className='row'>
                            <div className='col'>
                                <div className='form-group'>
                                    <label>
                                        <b>Ngày đăng ký:</b>
                                    </label>
                                    <input type="date" id="cndb1_cndb_date" value={cndb1_cndb_date} onChange={(e) => { setcndb1_cndb_date(e.target.value) }} size={20}></input>
                                </div>                               
                                <div className='form-group'>
                                    <label>
                                        <b>Số CNĐB: </b>
                                        <input type="text" id="cndb1_cndb_no" size="50" value={cndb1_cndb_no} onChange={(e) => { setcndb1_cndb_no(e.target.value) }} size={20}></input>
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <b>Mã nhân viên đăng ký: <span style={{ color: 'blue' }}> {cndb1_reg_empl_name} </span> </b>
                                        <input type="text" id="cndb1_reg_empl_no" size="50" value={cndb1_reg_empl_no} onChange={(e) => { setcndb1_reg_empl_no(e.target.value) }} onBlur={(e) => { handle_temp_info(e.target.value, 'cndb1_reg_empl_name') }} size={20}></input>
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <b>Tên Vật Liệu: </b>
                                        <input type="text" list="m_name_list" id="cndb1_m_name" size="50" value={cndb1_m_name} onChange={(e) => { setcndb1_m_name(e.target.value);}} onBlur={(e) => {handleMNAME(e.target.value); }} size={20}></input>
                                        <datalist id="m_name_list">
                                            {cndb1_m_name_list}
                                        </datalist>
                                    </label>
                                </div>
                                
                            </div>
                            <div className='col'>
                                <div className='form-group'>
                                    <label>
                                        <b>Tên lỗi chấp nhận: </b>
                                        <input type="text" list="m_defect_name" id="cndb1_defect_name" size="30" value={cndb1_defect_name} onChange={(e) => { setcndb1_defect_name(e.target.value) }} size={20}></input>
                                        <datalist id="m_defect_name">
                                            <option value="4.Dị vật/chấm gel-원단 이물/겔 점" />
                                            <option value="5.Nhăn VL-원단 주름" />
                                            <option value="6.Loang bẩn VL-얼룩" />
                                            <option value="7.Bóng khí VL-원단 기포" />
                                            <option value="8.Xước VL-원단 스크래치" />
                                            <option value="9.Chấm lồi lõm VL-원단 눌림" />
                                            <option value="10.Keo VL-원단 찐" />
                                            <option value="11.Lông PE VL-원단 버 (털 모양)" />
                                            <option value="0.Khác-기타" />
                                        </datalist>
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <b>Nội dung chi tiết: </b>                                        
                                        <textarea id="cndb1_defect_content" cols="25" rows="5" value={cndb1_defect_content} onChange={(e) => { setcndb1_defect_content(e.target.value) }}></textarea>
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label>
                                        <b>Remark:</b>
                                        <input type="text" id="cndb1_remark" size="30" value={cndb1_remark} onChange={(e) => { setcndb1_remark(e.target.value) }} size={20}></input>
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

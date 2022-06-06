import React, { useState, useContext, useEffect } from 'react'
import '../InfoPanel/InfoPanel.css'
import { UserContext } from '../../Api/Context'
import { diemdanhsummary, refresh_diemdanh } from '../../Api/Api';
import swal from 'sweetalert';
import { getHTMLTABLE2_SummaryTB } from '../../Api/tableRender';
import { addDataTabe } from '../../jq';
export default function InfoPanel() {
    const [userdata, setUserData] = useContext(UserContext);
    const [attInfo, setAttInfo] = useState('');
    const [summaryTB, setSummaryTB] = useState('');
    const [panelState, setPanelState] = useState('none');
    const DOB = () => {
        if (userdata.DOB != null) {
            return userdata.DOB;
        }
        else {
            return '2021-12-16';
        }
    }
    const att_refresh = () => {
        refresh_diemdanh()
            .then(data => {
                let Jresult = data.data;
                if (Jresult.tk_status == 'ng') {
                    swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                    window.location.href = "/";
                }
                else {
                    setAttInfo(Jresult.htmldata);
                }
            })
            .catch(error => {
                console.log("Loi: " + error + " ");
            });
    }
    const handlePanelState = () => {
        if (panelState == 'block') {
            setPanelState('none');
        }
        else {
            setPanelState('block');
        }
    }
    const summary = () => {
        diemdanhsummary()
            .then(data => {
                let Jresult = data.data;
                if (Jresult.tk_status == 'ng') {
                    swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                    window.location.href = "/";
                }
                else if (Jresult.tk_status == 'NO_LEADER') {
                    //alert("Bạn không phải learder, mời phắn");
                }
                else {
                    //console.log(Jresult.data);
                    var res = getHTMLTABLE2_SummaryTB(JSON.parse(Jresult.data), 'summarytb');
                    setSummaryTB(res);
                    addDataTabe('summarytb',1,'desc');
                }
            })
            .catch(error => {
                console.log("Loi: " + error + " ");
            });
    }     
    console.log("render info panel");
    useEffect(() => {
        att_refresh();
        summary(); 
        setInterval(att_refresh, 10000);
        setInterval(summary, 10000);
    }, []);
    return (
        <div id="info_panel">
            <button id="hide_show_button" className="btn btn-primary" onClick={handlePanelState}>-</button>
            <div className="p-3 my-3 bg-dark text-white " id="empl_info" style={{ display: panelState }}>
                <div id="dong1">
                    <div id="cot1">
                        <h5>Thông tin nhân viên:</h5>
                        <ul>
                            <li> Họ và tên: {userdata.MIDLAST_NAME} {userdata.FIRST_NAME}</li>
                            <li> Mã nhân sự: {userdata.CMS_ID}</li>
                            <li> Mã ERP: {userdata.EMPL_NO}</li>
                            <li> Ngày tháng năm sinh: {DOB().slice(0, 10)}</li>
                            <li> Quê quán: {userdata.HOMETOWN}</li>
                            <li> Địa chỉ: {userdata.ADD_VILLAGE}-{userdata.ADD_COMMUNE}-{userdata.ADD_DISTRICT}-{userdata.ADD_PROVINCE}</li>
                            <li> Bộ phận chính: {userdata.MAINDEPTNAME}</li>
                            <li> Bộ phận phụ: {userdata.SUBDEPTNAME}</li>
                            <li> Vị trí làm việc: {userdata.WORK_POSITION_NAME}</li>
                            <li> Nhóm điểm danh: {userdata.ATT_GROUP_CODE}</li>
                            <li> Chức vụ: {userdata.JOB_NAME}</li>
                        </ul>
                    </div>
                    <div id="cot2">
                        <h5>
                            <div id="att_refresh" align="left">
                                <span dangerouslySetInnerHTML={{ __html: attInfo }}></span>
                            </div>
                            <div id="check_chua_pd"> </div>
                        </h5>
                    </div>
                    <span id="smr" dangerouslySetInnerHTML={{ __html: summaryTB }}></span>
                </div>
                <marquee direction="left">Chúc anh chị em ngày mới tốt lành !</marquee>
            </div>
        </div>
    )
}

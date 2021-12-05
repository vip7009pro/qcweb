import React from 'react'
import '../NavMenu/NavMenu.css'
import Tabs from '../Tabs/Tabs'
import { useState } from 'react'
import Draggable from 'react-draggable';

function returnDraggableDiv(tab_no) {   

    const listForm = tab_no.map(formobj => 
        <Tabs TabName={tab_no[formobj]} />
    )    
    return listForm; 
}

export default function NavMenu() {

    const [tabNo, setTabNo] = useState(["1"]);
    console.log(tabNo[0]);
    console.log(typeof (tabNo[0]));

    const updateArray =(clicktab)=>{
        let newtabarray = [...tabNo,clicktab];
        console.log(newtabarray);
        setTabNo(newtabarray);       

    }

    return (
        <>
            <div id="menu_div">
                <button id="nav_show_btn">
                    <img src="menu_button.png" width="35px" height="35px"></img>
                </button>

                <ul className="topnav nav nav-tabs" id="myTopnav" style={{ display: "block" }}>
                    <li onClick={() => { updateArray("1"); }} className="nav-item active">
                        <a style={{ color: "white" }} className="nav-link" href="#home"><b>Đăng
                            ký nghỉ</b></a>
                    </li>
                    <li onClick={() => { updateArray("2"); }} className="nav-item">
                        <a style={{ color: "white" }} className="nav-link"
                            href="#overtime"><b>Đăng ký tăng ca</b></a>
                    </li>
                    <li onClick={() => { updateArray("3"); }} className="nav-item">
                        <a style={{ color: "white" }} className="nav-link" href="#menu1"
                            id="off_history"><b>Lịch sử nghỉ</b></a>
                    </li>
                    <li onClick={() => { updateArray("4"); }} className="nav-item">
                        <a style={{ color: "white" }} className="nav-link" href="#tradiemdanh"
                            id="diemdanh_history"><b>Lịch sử điểm
                                danh</b></a>
                    </li>
                    <li onClick={() => { updateArray("5"); }} className="nav-item">
                        <a style={{ color: "white" }} className="nav-link" href="#approve"
                            id="check_approve"><b>Phê duyệt nghỉ</b></a>
                    </li>
                    <li onClick={() => { updateArray("6"); }} className="nav-item">
                        <a style={{ color: "white" }} className="nav-link" href="#diemdanh"
                            id="attendance"><b>Điểm danh nhóm</b></a>
                    </li>
                    <li onClick={() => { updateArray("7"); }} className="nav-item">
                        <a style={{ color: "white" }} className="nav-link"
                            href="#total_att_panel" id="attendance_total"><b>Điểm danh
                                tổng</b></a>
                    </li>
                    <li onClick={() => { updateArray("8"); }} className="nav-item">
                        <a style={{ color: "white" }} className="nav-link" href="#hr_modify"
                            id="setteam"><b>Điều chuyển team</b></a>
                    </li>
                    <li onClick={() => { updateArray("9"); }} className="nav-item">
                        <a style={{ color: "white" }} className="nav-link" href="#huongdansd"
                            id="manual"><b>Hướng dẫn sử dụng</b></a>
                    </li>
                </ul>
            </div>
            <h1>{tabNo}</h1>
            {console.log(tabNo)}
            {returnDraggableDiv(tabNo)}
        </>

    )
}

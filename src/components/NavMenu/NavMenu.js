import React from 'react'
import '../NavMenu/NavMenu.css'
export default function NavMenu() {
    return (        
        <div id="menu_div">
            <button id="nav_show_btn">
                <img src="menu_button.png" width="35px" height="35px"></img>
            </button>

            <ul className="topnav nav nav-tabs" id="myTopnav" style={{display: "block"}}>
                <li className="nav-item active">
                    <a style={{ color: "white" }} className="nav-link" href="#home"><b>Đăng
                        ký nghỉ</b></a>
                </li>
                <li className="nav-item">
                    <a style={{ color: "white" }} className="nav-link"
                        href="#overtime"><b>Đăng ký tăng ca</b></a>
                </li>
                <li className="nav-item">
                    <a style={{ color: "white" }} className="nav-link" href="#menu1"
                        id="off_history"><b>Lịch sử nghỉ</b></a>
                </li>
                <li className="nav-item">
                    <a style={{ color: "white" }} className="nav-link" href="#tradiemdanh"
                        id="diemdanh_history"><b>Lịch sử điểm
                            danh</b></a>
                </li>
                <li className="nav-item">
                    <a style={{ color: "white" }} className="nav-link" href="#approve"
                        id="check_approve"><b>Phê duyệt nghỉ</b></a>
                </li>
                <li className="nav-item">
                    <a style={{ color: "white" }} className="nav-link" href="#diemdanh"
                        id="attendance"><b>Điểm danh nhóm</b></a>
                </li>
                <li className="nav-item">
                    <a style={{ color: "white" }} className="nav-link"
                        href="#total_att_panel" id="attendance_total"><b>Điểm danh
                            tổng</b></a>
                </li>
                <li className="nav-item">
                    <a style={{ color: "white" }} className="nav-link" href="#hr_modify"
                        id="setteam"><b>Điều chuyển team</b></a>
                </li>
                <li className="nav-item">
                    <a style={{ color: "white" }} className="nav-link" href="#huongdansd"
                        id="manual"><b>Hướng dẫn sử dụng</b></a>
                </li>
            </ul>
        </div>
        
    )
}

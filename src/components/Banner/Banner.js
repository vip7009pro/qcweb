import React, { useEffect } from 'react'
import { useState } from 'react';
import swal from 'sweetalert';
import { logout } from '../../Api/Api'
import '../Banner/Banner.css'
export default function Banner(props) {
    const log_out = () => {
        logout();
        swal("Thông báo", "Đăng xuất thành công", "success");
    }

    const [currentTime, setCurrentTime]= useState(new Date().toString());
    useEffect(()=>{
        setTimeout(()=>{
            setCurrentTime(new Date().toLocaleString());
            //console.log(currentTime);
        },1000);

    },[currentTime]);

    return (
        <div className="container p-3 my-3" id="basic_info" >
            <marquee direction="left" className="text-white ">
                <h3>Hệ thống quản lý nhân sự QC - Kiểm Tra </h3>
            </marquee>
            <button id="logout_bt" className="btn btn-primary" onClick={log_out}> Logout</button>
            <div><span id="watch">Giờ: {currentTime}</span></div>
        </div>
    )
}

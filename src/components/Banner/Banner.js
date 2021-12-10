import React from 'react'
import swal from 'sweetalert';
import { logout } from '../../Api/Api'
import '../Banner/Banner.css'
export default function Banner(props) {    
    const log_out = ()=>
    {
        logout();
        swal("Thông báo", "Đăng xuất thành công","success");
        
    }
    return (        
        <div className="container p-3 my-3" id="basic_info" onClick={log_out}>
            <marquee direction="left" className="text-white ">
                <h3>Hệ thống quản lý nhân sự QC - Kiểm Tra </h3>
            </marquee>
            <button id="logout_bt" className="btn btn-primary"> Logout</button>
        </div>
    )
}

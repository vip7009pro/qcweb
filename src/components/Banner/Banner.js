import React from 'react'
import '../Banner/Banner.css'
export default function Banner(props) {
    
    return (        
        <div className="container p-3 my-3" id="basic_info">
            <marquee direction="left" className="text-white ">
                <h3>Hệ thống quản lý nhân sự QC - Kiểm Tra </h3>
            </marquee>
            <button id="logout_bt" className="btn btn-primary"> Logout</button>
        </div>
    )
}

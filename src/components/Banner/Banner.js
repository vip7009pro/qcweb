import React, { useEffect,useState } from 'react'
import swal from 'sweetalert';
import { logout } from '../../Api/Api'
import { doubleClickCell, notificationFadeIn, notificationFadeOut } from '../../jq';
import '../Banner/Banner.css'
export default function Banner(props) {
    const [notidisplay,setNotiDisplay] = useState(1);
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

    const handeTurnOnOffNoti = ()=>{
        if(notidisplay == 1)
        {
            notificationFadeOut();    
            setNotiDisplay(0);
        }
        else
        {
            notificationFadeIn();
            setNotiDisplay(1);
        }
    }
    return (
        <div /* className="container p-3 my-3" */ id="basic_info" >
            <marquee direction="left" className="text-white ">
                <h3>Hệ thống quản lý nhân sự CMS </h3>
            </marquee>
            <button id="turnonNotifi" className="btn btn-success" onClick={()=>{ handeTurnOnOffNoti()}}> Bật/Tắt thông báo</button>
            <button id="logout_bt" className="btn btn-primary" onClick={log_out}> Logout</button>
            <div><span id="watch">Giờ: {currentTime}</span></div>
        </div>
    )
}

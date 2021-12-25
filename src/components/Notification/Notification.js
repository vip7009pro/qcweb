import React, { useEffect, useState, useContext, useRef } from 'react'
import '../Notification/Notification.css'
import { SocketContext } from '../../Api/Context'
import { notificationFadeIn, notificationFadeOut, notifiJQ } from '../../jq';
export default function Notification() {
    const SocketRefContext = useContext(SocketContext);
    const [noti, setNoTi] = useState([]);
    const notiRef = useRef();
    notiRef.current = noti;
    const renderNoti = (notifi)=>{
        let NotiHTML = "";
        for( const notiEle of notifi)
        {
            NotiHTML += notiEle;
        }
        return NotiHTML;
    }
    
    useEffect(() => {
        //console.log("Vao useEffect notification");
        SocketRefContext.current.on('notification', data => {
            if (data.type == 'diemdanh') {               
                if (data.on_off == '0') {
                    let newNoti = [...notiRef.current,data.time + ":<br> " + data.empl_no + ": Điểm danh NGHỈ LÀM<br>"]
                    console.log(newNoti);
                    setNoTi(newNoti);
                }
                else {
                    let newNoti = [...notiRef.current,data.time + ":<br> " + data.empl_no + ": Điểm danh ĐI LÀM<br>"]
                    console.log(newNoti);
                    setNoTi(newNoti);
                }               
            }
            else if (data.type == 'tangca') {
            }
            notifiJQ();
        });
        return () => {
            SocketRefContext.current.disconnect();
        }
    }, []);
    return (
        noti &&
        <div id="notification_bar">
            <h6><b>Thông báo</b></h6>            
            <div id="notifi_content"><span id="notiSpan" dangerouslySetInnerHTML={{ __html: renderNoti(noti) }}></span></div>
        </div>
    )
}

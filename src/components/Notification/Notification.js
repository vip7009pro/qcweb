import React, { useEffect, useState, useContext } from 'react'
import '../Notification/Notification.css'
import { SocketContext } from '../../Api/Context'
import { notificationFadeIn, notificationFadeOut } from '../../jq';
export default function Notification() {
    const SocketRefContext = useContext(SocketContext);
    const [noti, setNoTi] = useState(0);
    useEffect(() => {
        console.log("Vao useEffect notification");
        SocketRefContext.current.on('notification', data => {
            if (data.type == 'diemdanh') {
                notificationFadeIn();
                if (data.on_off == '0') {
                    setNoTi(data.time + ":<br> " + data.empl_no + ": Điểm danh NGHỈ LÀM");
                }
                else {
                    setNoTi(data.time + ":<br> " + data.empl_no + ": Điểm danh ĐI LÀM");
                }
                notificationFadeOut();
            }
            else if (data.type == 'tangca') {
            }
        });
        return () => {
            SocketRefContext.current.disconnect();
        }
    }, []);
    return (
        noti &&
        <div id="notification_bar">
            <h6><b>Thông báo</b></h6>
            <div id="notifi_content"><span dangerouslySetInnerHTML={{ __html: noti }}></span></div>
        </div>
    )
}

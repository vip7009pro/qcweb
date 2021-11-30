import React from 'react'
import '../InfoPanel/InfoPanel.css'

export default function InfoPanel() {
    return (
        <div id="info_panel">
            <button id="hide_show_button" class="btn btn-primary">-</button>
            <div class="container p-3 my-3 bg-dark text-white " id="empl_info">
                <div id="dong1">
                    <div id="cot1">
                        <h5>
                            <h5>Thông tin nhân viên:</h5>
                            <ul>
                                <li> Họ và tên: NGUYỄN VĂN HÙNG3</li>
                                <li> Mã nhân sự: CMS1179</li>
                                <li> Mã ERP: NHU1903</li>
                                <li> Ngày tháng năm sinh: 1993-10-18</li>
                                <li> Quê quán: Phụ Thọ - Đông Xuân - Sóc Sơn - Hà Nội</li>
                                <li> Địa chỉ: Thôn Phú Thọ-Đông Xuân-Sóc Sơn-Hà Nội</li>
                                <li> Bộ phận chính: QC</li>
                                <li> Bộ phận phụ: PD</li>
                                <li> Vị trí làm việc: PD</li>
                                <li> Nhóm điểm danh: 1</li>
                                <li> Chức vụ: Dept Staff</li>
                            </ul>
                        </h5>
                    </div>
                    <div id="cot2">
                        <h5>
                            <div id="att_refresh" align="left">
                                <h5>Thông tin điểm danh</h5>
                                <ul align="left">
                                    <li id="team1_att"> Điểm danh team 1: 10/108
                                    </li>
                                    <li id="team2_att"> Điểm danh team 2: 11/97
                                    </li>
                                    <li id="teamHC_att"> Điểm danh team HC: 8/48
                                    </li>
                                    <li id="total_att"><b> Tổng điểm danh: 29/253 </b></li>
                                    <li id="online_person"> Người Online: HƯƠNG, DUY, HÙNG3, HẰNG, THƯ, THU,  </li>
                                </ul>

                            </div>
                            <div id="check_chua_pd"> </div>
                        </h5>
                    </div>
                </div>               
                <marquee direction="left">Chúc anh chị em ngày mới tốt lành !</marquee>
            </div>
        </div>

    )
}

import { useContext } from 'react';
import $ from 'jquery';
import swal from 'sweetalert';
import { insertSampleQtyPQC1, setdiemdanh, setpheduyet, settangca, setteamBT } from './Api/Api';
import { SocketContext } from './Api/Context';
import 'datatables.net'
function isValid(date, h1, m1, h2, m2) {
    return true;
    var h = date.getHours();
    var m = date.getMinutes();
    return (h1 < h || h1 == h && m1 <= m) && (h < h2 || h == h2 && m <= m2);
}
export function JQF() {
    resetTC();
    resetBT();
    tangcangay1720();
    tangcadem0206();
    tangcadem0508();
    tangcangay1620();
    tangcangay1718();
    ktc();
    //changViewTable();
    //toggleTableView();
    setTeam1();
    setTeam2();
    setTeamHC();
    setpheduyetAPPROVE();
    setpheduyetDENY();
    setpheduyetCANCEL();
    $("#chat_panel").fadeOut(250);
}
export function hideChat() {
    $("#chat_panel").fadeOut(250);
}
export function resetTC() {
    $(document).on('click', '.RESET_TC_button', function () {
        let $row = $(this).closest("tr")
            , $tds = $row.find("td:nth-child(2)");
        let $tds2 = $row.find("td:nth-child(5)");
        $.each($tds, function () {
            // if (isValid(new Date(), 8, 00, 15, 30)) 
            if (1 == 1) {
                $tds2.html("<button type='button' class='K_TC_button btn btn-success'> K_T_C </button> <button type='button' class='TC0206_button btn btn-outline-light'> 02-06 </button> <button type='button' class='TC_NGAY_button btn btn-outline-light'> 17-20 </button> <button type='button' class='TC_NGAY2_button btn btn-outline-light'> 17-18 </button><button type='button' class='TC_DEM_button btn btn-outline-light'> 05-08 </button><button type='button' class='TC_16_button btn btn-outline-light'> 16-20 </button>");
            }
            else {
                alert("Chỉ RESET được trong khoảng thời gian 7h-> 15h30");
            }
        });
    });
}
export function resetBT() {
    $(document).on('click', '.RESET_button', function () {
        let $row = $(this).closest("tr")
            , $tds = $row.find("td:nth-child(2)");
        let $tds2 = $row.find("td:nth-child(4)");
        $.each($tds, function () {
            if ((isValid(new Date(), 17, 10, 20, 10) || isValid(new Date(), 5, 10, 8, 10))) {
                $tds2.html("<button type='button' class='ON_button btn btn-success'> LÀM </button> <button type='button' class='OFF_button btn btn-danger'> NGHỈ </button>");
            }
            else {
                alert("Chỉ RESET được trong khoảng thời gian 7h-> 8h10 hoặc 19h -> 20h10");
            }
        });
    });
}
export function diemdanhON(SocketRefContext) {
    $(document).on('click', '.ON_button', function () {
        let $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        let $tds2 = $row.find("td:nth-child(4)");
        let $tds_donnghi = $row.find("td:nth-child(19)");
        let $tds_nuaphep = $row.find("td:nth-child(25)");
        let $don_nghi = "";
        let $nuaphep = "";
        $.each($tds_donnghi, function () {
            $don_nghi = $(this).text();
        });
        $.each($tds_nuaphep, function () {
            $nuaphep = $(this).text();
        });
        var $daduyet = 'Đã duyệt';
        var $np = 'Nửa phép';
        if ($don_nghi == $daduyet && $nuaphep != $np) {
            swal("Thông báo", "Người này đã được duyệt đơn nghỉ hôm nay, Chỉ có thể đánh nghỉ, hủy duyệt mới điểm danh được", "error");
        } else {
            $.each($tds, function () {
                var EMPL_NO1 = $(this).text();
                setdiemdanh(EMPL_NO1, '1')
                    .then(response => {
                        let Jresult = response.data;
                        if (Jresult.tk_status == 'ng') {
                            swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                            window.location.href = "/";
                        }
                        else {
                            var chattime = new Date();
                            var ct = chattime.getFullYear() + "-" + (chattime.getMonth() + 1) + "-" + chattime.getDate() + "  " + chattime.getHours() + ":" + chattime.getMinutes() + ":" + chattime.getSeconds();
                            let notification_data = {
                                type: 'diemdanh',
                                empl_no: EMPL_NO1,
                                on_off: '1',
                                time: ct
                            };
                            SocketRefContext.current.emit('notification', notification_data);
                            $tds2.html("<b><p style='color:LightGreen;'>Đi làm</p> </b> <button type='button' class='RESET_button btn btn-warning'> RESET </button>");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
    });
}
export function diemdanhOFF(SocketRefContext) {
    $(document).on('click', '.OFF_button', function () {
        let $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        let $tds2 = $row.find("td:nth-child(4)");
        $.each($tds, function () {
            var EMPL_NO1 = $(this).text();
            setdiemdanh(EMPL_NO1, '0')
                .then(response => {
                    let Jresult = response.data;
                    if (Jresult.tk_status == 'ng') {
                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                        window.location.href = "/";
                    }
                    else {
                        var chattime = new Date();
                        var ct = chattime.getFullYear() + "-" + (chattime.getMonth() + 1) + "-" + chattime.getDate() + "  " + chattime.getHours() + ":" + chattime.getMinutes() + ":" + chattime.getSeconds();
                        let notification_data = {
                            type: 'diemdanh',
                            empl_no: EMPL_NO1,
                            on_off: '0',
                            time: ct
                        };
                        SocketRefContext.current.emit('notification', notification_data);
                        $tds2.html("<b><p style='color:red;'>Nghỉ làm</p> </b> <button type='button' class='RESET_button btn btn-warning'> RESET </button>");
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        });
    });
}
export function tangcangay1720() {
    $(document).on('click', '.TC_NGAY_button', function () {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        let $tds2 = $row.find("td:nth-child(5)");
        $.each($tds, function () {
            var EMPL_NO1 = $(this).text();
            settangca('1', EMPL_NO1, '1700', '2000')
                .then(response => {
                    var Jresult = response.data;
                    if (Jresult.tk_status == 'ng') {
                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                        window.location.href = "/";
                    }
                    else {
                        if (Jresult.tk_status == 'OK') {
                            $tds2.html("<b><p style='color:#d6f789;'>TC</p> </b> <button type='button' class='RESET_TC_button btn btn-warning'> RESET </button>");
                        }
                        else {
                            swal("Thông báo", "Lỗi rồi !", "info");
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        });
    });
}
export function tangcangay1718() {
    $(document).on('click', '.TC_NGAY2_button', function () {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        let $tds2 = $row.find("td:nth-child(5)");
        $.each($tds, function () {
            var EMPL_NO1 = $(this).text();
            settangca('1', EMPL_NO1, '1700', '1800')
                .then(response => {
                    var Jresult = response.data;
                    if (Jresult.tk_status == 'ng') {
                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                        window.location.href = "/";
                    }
                    else {
                        if (Jresult.tk_status == 'OK') {
                            $tds2.html("<b><p style='color:#d6f789;'>TC</p> </b> <button type='button' class='RESET_TC_button btn btn-warning'> RESET </button>");
                        }
                        else {
                            swal("Thông báo", "Lỗi rồi !", "info");
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        });
    });
}
export function tangcangay1620() {
    $(document).on('click', '.TC_16_button', function () {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        let $tds2 = $row.find("td:nth-child(5)");
        $.each($tds, function () {
            var EMPL_NO1 = $(this).text();
            settangca('1', EMPL_NO1, '1600', '2000')
                .then(response => {
                    var Jresult = response.data;
                    if (Jresult.tk_status == 'ng') {
                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                        window.location.href = "/";
                    }
                    else {
                        if (Jresult.tk_status == 'OK') {
                            $tds2.html("<b><p style='color:#d6f789;'>TC</p> </b> <button type='button' class='RESET_TC_button btn btn-warning'> RESET </button>");
                        }
                        else {
                            swal("Thông báo", "Lỗi rồi !", "info");
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        });
    });
}
export function tangcadem0508() {
    $(document).on('click', '.TC_DEM_button', function () {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        let $tds2 = $row.find("td:nth-child(5)");
        $.each($tds, function () {
            var EMPL_NO1 = $(this).text();
            settangca('1', EMPL_NO1, '0500', '0800')
                .then(response => {
                    var Jresult = response.data;
                    if (Jresult.tk_status == 'ng') {
                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                        window.location.href = "/";
                    }
                    else {
                        if (Jresult.tk_status == 'OK') {
                            $tds2.html("<b><p style='color:#d6f789;'>TC</p> </b> <button type='button' class='RESET_TC_button btn btn-warning'> RESET </button>");
                        }
                        else {
                            swal("Thông báo", "Lỗi rồi !", "info");
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        });
    });
}
export function tangcadem0206() {
    $(document).on('click', '.TC0206_button', function () {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        let $tds2 = $row.find("td:nth-child(5)");
        $.each($tds, function () {
            var EMPL_NO1 = $(this).text();
            settangca('1', EMPL_NO1, '0200', '0600')
                .then(response => {
                    var Jresult = response.data;
                    if (Jresult.tk_status == 'ng') {
                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                        window.location.href = "/";
                    }
                    else {
                        if (Jresult.tk_status == 'OK') {
                            $tds2.html("<b><p style='color:#d6f789;'>TC</p> </b> <button type='button' class='RESET_TC_button btn btn-warning'> RESET </button>");
                        }
                        else {
                            swal("Thông báo", "Lỗi rồi !", "info");
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        });
    });
}
export function ktc() {
    $(document).on('click', '.K_TC_button', function () {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        let $tds2 = $row.find("td:nth-child(5)");
        $.each($tds, function () {
            var EMPL_NO1 = $(this).text();
            settangca('0', EMPL_NO1, '', '')
                .then(response => {
                    var Jresult = response.data;
                    if (Jresult.tk_status == 'ng') {
                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                        window.location.href = "/";
                    }
                    else {
                        if (Jresult.tk_status == 'OK') {
                            $tds2.html("<b><p style='color:#d6f789;'>Không tăng ca</p> </b> <button type='button' class='RESET_TC_button btn btn-warning'> RESET </button>");
                        }
                        else {
                            swal("Thông báo", "Lỗi rồi !", "info");
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        });
    });
}
export function addDataTabe(tableid, colnum, order) {
    if ($.fn.dataTable.isDataTable('#' + tableid)) {
        console.log("Đã là table rồi, k cần thêm nữa");
    }
    else {
        let table = $('#' + tableid).DataTable({
            paging: false,
            "order": [[colnum, order]]
        },
        );
    }
}
export function toggleTableView() {
    $(".table").toggleClass("table-responsive");
}
export function setTeam1() {
    $(document).on('click', '.SET_TEAM1_button', function () {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        let $workshiftname = $row.find("td:nth-child(4)");
        let $tds2 = $row.find("td:nth-child(5)");
        swal("Thực sự muốn chuyển team?", {
            buttons: {
                cancel: "Không",
                ok: {
                    text: "Có", value: "ok"
                }
            }
        })
            .then(value => {
                switch (value) {
                    case 'ok':
                        swal("Thông báo", "Chuyển thành công", "success");
                        $.each($tds, function () {
                            var EMPL_NO1 = $(this).text();
                            //alert(EMPL_NO1);
                            setteamBT(EMPL_NO1, '1')
                                .then(response => {
                                    var Jresult = response.data;
                                    if (Jresult.tk_status == 'ng') {
                                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                                        window.location.href = "/";
                                    }
                                    else {
                                        //alert(result);				
                                        $workshiftname.html("<b align='center'> TEAM 1 </b>");
                                        $tds2.html("<button type='button' class='SET_TEAM2_button btn btn-danger'> SET_TEAM__2 </button><button type='button' class='SET_TEAM_HC_button btn btn-success'> SET_TEAMHC </button>");
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        });
                        break;
                    default:
                        break;
                }
            })
    });
}
export function setTeam2() {
    $(document).on('click', '.SET_TEAM2_button', function () {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        let $workshiftname = $row.find("td:nth-child(4)");
        let $tds2 = $row.find("td:nth-child(5)");
        swal("Thực sự muốn chuyển team?", {
            buttons: {
                cancel: "Không",
                ok: {
                    text: "Có", value: "ok"
                }
            }
        })
            .then(value => {
                switch (value) {
                    case 'ok':
                        swal("Thông báo", "Chuyển thành công", "success");
                        $.each($tds, function () {
                            var EMPL_NO1 = $(this).text();
                            //alert(EMPL_NO1);
                            setteamBT(EMPL_NO1, '2')
                                .then(response => {
                                    var Jresult = response.data;
                                    if (Jresult.tk_status == 'ng') {
                                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                                        window.location.href = "/";
                                    }
                                    else {
                                        //alert(result);				
                                        $workshiftname.html("<b align='center'> TEAM 2 </b>");
                                        $tds2.html("<button type='button' class='SET_TEAM1_button btn btn-primary'> SET_TEAM__1 </button><button type='button' class='SET_TEAM_HC_button btn btn-success'> SET_TEAMHC </button>");
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        });
                        break;
                    default:
                        break;
                }
            })
    });
}
export function setTeamHC() {
    $(document).on('click', '.SET_TEAM_HC_button', function () {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        let $workshiftname = $row.find("td:nth-child(4)");
        let $tds2 = $row.find("td:nth-child(5)");
        swal("Thực sự muốn chuyển team?", {
            buttons: {
                cancel: "Không",
                ok: {
                    text: "Có", value: "ok"
                }
            }
        })
            .then(value => {
                switch (value) {
                    case 'ok':
                        swal("Thông báo", "Chuyển thành công", "success");
                        $.each($tds, function () {
                            var EMPL_NO1 = $(this).text();
                            //alert(EMPL_NO1);
                            setteamBT(EMPL_NO1, '0')
                                .then(response => {
                                    var Jresult = response.data;
                                    if (Jresult.tk_status == 'ng') {
                                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                                        window.location.href = "/";
                                    }
                                    else {
                                        //alert(result);				
                                        $workshiftname.html("<b align='center'>Hành Chính</b>");
                                        $tds2.html("<button type='button' class='SET_TEAM1_button btn btn-primary'> SET_TEAM__1 </button><button type='button' class='SET_TEAM2_button btn btn-danger'> SET_TEAM__2 </button>");
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        });
                        break;
                    default:
                        break;
                }
            })
    });
}
export function setpheduyetAPPROVE() {
    $(document).on('click', '.approve_button', function () {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(1)");
        let $tds2 = $row.find("td:nth-child(2)");
        let $tds_on_off = $row.find("td:nth-child(20)");
        let $tds_lydo = $row.find("td:nth-child(17)");
        var $on_off = "";
        var $lydo = "";
        let $on_lydooff = "";
        $.each($tds_on_off, function () {
            $on_off = $(this).text();
        });
        $.each($tds_lydo, function () {
            $on_lydooff = $(this).text();
        });
        //alert($on_off);
        if ($on_off != 1 || $on_lydooff == 'Nửa phép') {
            $.each($tds, function () {
                //console.log($(this).text());
                //alert($(this).text() + " Phê duyệt");
                var OFF_ID = $(this).text();
                setpheduyet(OFF_ID, '1')
                    .then(response => {
                        var Jresult = response.data;
                        if (Jresult.tk_status == 'ng') {
                            swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                            window.location.href = "/";
                        }
                        else if (Jresult.tk_status == 'ERROR') {
                            swal("Thông báo", "Có lỗi", "error");
                        }
                        else if (Jresult.tk_status == 'NO_LEADER') {
                            swal("Thông báo", "Bạn không phải leader, mời phắn", "info");
                        }
                        else {
                            $tds2.html("<b><p style='color:LightGreen;'>Đã duyệt</p> </b>");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            });
        }
        else {
            swal("Thông báo", "Không phê duyệt được khi đã điểm danh đi làm !, điểm danh nghỉ rồi mới phê duyệt được", "error");
        }
    });
}
export function setpheduyetDENY() {
    $(document).on('click', '.deny_button', function () {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(1)");
        let $tds2 = $row.find("td:nth-child(2)");
        $.each($tds, function () {
            var OFF_ID = $(this).text();
            setpheduyet(OFF_ID, '0')
                .then(response => {
                    var Jresult = response.data;
                    if (Jresult.tk_status == 'ng') {
                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                        window.location.href = "/";
                    }
                    else if (Jresult.tk_status == 'ERROR') {
                        swal("Thông báo", "Có lỗi", "error");
                    }
                    else if (Jresult.tk_status == 'NO_LEADER') {
                        swal("Thông báo", "Bạn không phải leader, mời phắn", "info");
                    }
                    else {
                        $tds2.html("<b><p style='color:red;'>Từ chối</p> </b>");
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        });
    });
}
export function setpheduyetCANCEL() {
    $(document).on('click', '.cancel_button', function () {
        swal("Thực sự muốn xóa phê duyệt?", {
            buttons: {
                cancel: "Không",
                ok: {
                    text: "Có", value: "ok"
                }
            }
        })
            .then(value => {
                switch (value) {
                    case 'ok':
                        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(1)");
                        let $tds2 = $row.find("td:nth-child(2)");
                        $.each($tds, function () {
                            //console.log($(this).text());
                            //alert($(this).text()+ " Từ chối");
                            var OFF_ID = $(this).text();
                            setpheduyet(OFF_ID, '3')
                                .then(response => {
                                    var Jresult = response.data;
                                    if (Jresult.tk_status == 'ng') {
                                        swal("Thông báo", "Phiên đăng nhập hết hạn, đăng nhập lại nhé", "info");
                                        window.location.href = "/";
                                    }
                                    else {
                                        $tds2.html("<b><p style='color:yellow;'>Đã xóa</p> </b>");
                                        swal("Thông báo", "Xóa thành công", "success");
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        });
                        break;
                    default:
                        break;
                }
            })
    });
}
export function socketJQ() {
    $("#chat_panel").show();
    var myDiv = document.getElementById("chat_content");
    myDiv.scrollTop = myDiv.scrollHeight;
}
export function notifiJQ() {
    var myDiv = document.getElementById("notifi_content");
    myDiv.scrollTop = myDiv.scrollHeight;
}
export function toggleChatPannel() {
    let kk = 1;
    $(document).on('click', '#hide_show_button2', function () {
        if (kk == 1) {
            $("#chat_panel").fadeIn(250);
            kk = 0;
        }
        else {
            $("#chat_panel").fadeOut(250);
            kk = 1;
        }
    })
}

export function toggleFormPannel() {
    let kkk1 = 1;
    $(document).on('click', '.hide_show_form_button', function () {
        if (kkk1 == 1) {
            $(".pqcform").fadeIn(250);
            kkk1 = 0;         
           // alert("A");   
        }
        else {
            $(".pqcform").fadeOut(250);
            kkk1 = 1;       
           // alert("B");     
        }
    })
}

export function notificationFadeIn() {
    $("#notification_bar").fadeIn(250);
}
export function notificationFadeOut() {
    $("#notification_bar").fadeOut(250);
}
export function scrollToDIV(divID) {
    $('#' + divID).scrollTop(0);
    //$("#"+divID).animate({scrollTop: $("#"+divID).offset().top});
}
export function addColumnTable(tableID, pos, col_name, content) {
    $("#" + tableID)
        .find("tr")
        .each(function () {
            $(this).find("th").eq(pos).after(`<th>${col_name}</th>`);
            $(this).find("td").eq(pos).after(`<td>${content}</td>`);
        });
}
export function addRowTable(tableID, content) {
    //$('.table-responsive tr th').children().length;
    let col_num = $("#" + tableID + " > tbody > tr:first > td").length;
    let rowhtml = "";
    for (var ii = 0; ii < col_num; ii++) {
        rowhtml += "<td>" + content + " </td>";
    }
    rowhtml = "<tr>" + rowhtml + "</tr>";
    $('#' + tableID).prepend(rowhtml);
}
export function readingTable(tableID) {
    console.log("clicked !");
    var table = document.getElementById(tableID);
    /* for(var i=1;i< table.rows.length;i++)
    {       
         for(var j=0;j<table.rows[i].cells.length;j++)
        {
            var oo = table.rows[i].cells[j];
            oo.innerHTML=`<button class="click_vd btn btn-primary">Click vào đây</button> [${i}] [${j}]`;
        }        
    }    */
    for (var i = 1; i < table.rows.length; i++) {
        var oo = table.rows[i].cells[12];
        oo.innerHTML = `<input type="text" value="${oo.innerHTML}" ></input>`;
    }
}
export function modifyColumn(tableID, colnum) {
    var table = document.getElementById(tableID);
    for (var i = 1; i < table.rows.length; i++) {
        var oo = table.rows[i].cells[colnum];
        if (oo.innerHTML == "0") {
            oo.innerHTML = `<input type="text" value="" ></input>`;
            //console.log(oo.firstChild.value)
        }
    }
}
export function updateColumn(tableID, colnum) {
    var table = document.getElementById(tableID);
    let bulkupdatedata = [];
    for (var i = 1; i < table.rows.length; i++) {
        let sample_qty = table.rows[i].cells[colnum];
        let pqc1_id = table.rows[i].cells[2].innerHTML;
        console.log(pqc1_id + ":" + sample_qty.innerHTML);
        if (sample_qty.innerHTML == `<input type="text" value="">`) {
            let sample_input_qty = sample_qty.firstChild.value
            let insertdata = {
                INSPECT_SAMPLE_QTY: sample_input_qty,
                PQC1_ID: pqc1_id
            }
            bulkupdatedata = [...bulkupdatedata, insertdata];
        }
    }
    console.log(bulkupdatedata);
    if (bulkupdatedata.length > 0) {
        insertSampleQtyPQC1(bulkupdatedata)
            .then(response => {
                let Jresult = response.data;
                if (Jresult.tk_status == 'OK') {
                    swal("Thông báo", "Update thành công", "success");
                }
                else {
                    swal("Lỗi", Jresult.message, "error");
                }
            })
            .catch(error => {
                swal("Cảnh báo", "Có lỗi trong quá trình update", "error");
            })
    }
    else {
        swal("Thông báo", "Không có gì để update", "info");
    }
}
export function doubleClickCell() {
    $(document).on('dblclick', 'td', function () {
        let value;
        $(this).each(function () {
            value = $(this).html();
        })
        $(this).html("<input value='" + value + "' ></input>");
    });
}
export function clickVaoday() {
    $(document).on("click", ".click_vd", function () {
        let $row = $(this).closest("tr");
        let $td = $row.find("td:nth-child(1)");
        let $input = $td.find("input:nth-child(1)");
        $.each($input, function () {
            alert($input.val());
        });
        /*  $.each($td, function () {
           $td.html("owahgowaehogweg");
         }); */
    });
}
let kkk = 1;
export function hidechat() {
    if (kkk == 1) {
        $("#chat_panel").fadeIn(250);
        kkk = 0;
    }
    else {
        $("#chat_panel").fadeOut(250);
        kkk = 1;
    }
}
export function keydowninput() {
    $('.pqc1form').on('keydown', 'input', function (event) {
        if (event.key == 'Enter') {
            event.preventDefault();
            alert('da bam enter');
        }
    });
}

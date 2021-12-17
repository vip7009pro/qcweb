import $ from 'jquery';
import swal from 'sweetalert';
import { setdiemdanh, settangca } from './Api/Api';
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
    diemdanhON();
    diemdanhOFF();
    tangcangay1720();
    tangcadem0206();
    tangcadem0508();
    tangcangay1620();
    tangcangay1718();
    ktc();    
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
export function diemdanhON() {
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
export function diemdanhOFF() {
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
export function addDataTabe(tableid) {
    if ($.fn.dataTable.isDataTable('#' + tableid)) {
        console.log("Đã là table rồi, k cần thêm nữa");
    }
    else {
        let table = $('#' + tableid).DataTable({
            paging: false
        });        
    }
}
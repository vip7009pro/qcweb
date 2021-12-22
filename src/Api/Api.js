import axios from "axios";
import Cookies from "universal-cookie/es6";
import swal from "sweetalert";
const cookies = new Cookies();
axios.defaults.withCredentials = true;
export function login(user, pass) {
    axios.post('http://14.160.33.94:100/api', {
        command: "login",
        user: user,
        pass: pass
    })
        .then((response) => {
            console.log("ketqua");
            console.log(response.data);
            var Jresult = response.data;
            console.log("Status = " + Jresult.tk_status);
            console.log("Tokent content = " + Jresult.token_content);
            if (Jresult.tk_status == 'ok') {
                console.log(Jresult.token_content);
                swal("Thông báo", "Chúc mừng bạn, đăng nhập thành công !", "success");
                //alert("Đăng nhập thành công");
                cookies.set('token', Jresult.token_content, { path: "/" });
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            }
            else {
                swal("Tên đăng nhập hoặc mật khẩu sai");
            }
        })
        .catch((error) => {
            console.log(error);
        })
}
export function logout() {
    cookies.set('token', 'reset', { path: "/" });
    swal("Thông báo", "Đăng xuất thành công !", "success");
    setTimeout(() => {
        window.location.href = "/";
    }, 2000);
}
export async function checkLogin() {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: "checklogin"
    });
    return data;
}
export async function diemdanhnhom(team_name) {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: "diemdanh",
        team_name_list: team_name
    });
    return data;
}
export async function setdiemdanh(empl_no,diemdanhvalue) {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: "setdiemdanh",
        diemdanhvalue: diemdanhvalue,
        EMPL_NO: empl_no
    });
    return data;
}
export async function settangca(tangcayesno, EMPL_NO1, over_start, over_finish) {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'dangkytangca2',
        tangcayesno1: tangcayesno,
        EMPL_NO: EMPL_NO1,
        over_start: over_start,
        over_finish: over_finish
    });
    return data;
}
export async function dangkynghi(canghi,ngaybatdau,ngayketthuc,reason_name,remark_content) {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'dangkynghi',
                canghi: canghi,
                ngaybatdau: ngaybatdau,
                ngayketthuc: ngayketthuc,
                reason_name: reason_name,
                remark_content: remark_content        
    });
    return data;
}
export async function refresh_diemdanh() {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'att_refresh'                   
    });
    return data;
}
export async function diemdanhsummary() {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'diemdanhsummary'                   
    });
    return data;
}
export async function settangcaform(tangcayesno, EMPL_NO1, over_start, over_finish) {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'dangkytangca',
        tangcayesno: tangcayesno,        
        over_start: over_start,
        over_finish: over_finish
    });
    return data;
}
export async function off_history(){
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'tralichsu'
    });
    return data;
}
export async function on_history(from_date,to_date){
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'mydiemdanh',
        from_date: from_date,
        to_date: to_date
    });
    return data;
}
export async function pheduyetnghi(){
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'pheduyet'
    });
    return data;
}

export async function diemdanhtong(frm_date,t_date,nghisinhvalue,subdeptname,maindeptname,team_name_total1) {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'diemdanh_total',
        from_date_total: frm_date,
        to_date_total: t_date,
        nghisinhvalue: nghisinhvalue,
        SUBDEPTNAME: subdeptname,
        team_name_total: team_name_total1,
        MAINDEPTNAME: maindeptname
    });
    return data;
}

export async function setteam() {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'setteamtab'       
    });
    return data;
}
export async function setteamBT(EMPL_NO1, teamvalue) {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'setteambt',
        EMPL_NO: EMPL_NO1,
        teamvalue: teamvalue
    });
    return data;
}
export async function setpheduyet(OFF_ID, pheduyetvalue) {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'setpheduyet',
        off_id: OFF_ID,
        pheduyetvalue: pheduyetvalue
    });
    return data;
}

export async function get_pqc1_output_data() {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'pqc1_output_data'        
    });
    return data;
}
export async function get_pqc2_output_data() {
    let data = await axios.post('http://14.160.33.94:100/api', {
        command: 'pqc1_output_data'        
    });
    return data;
}
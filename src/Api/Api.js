import axios from "axios";
import Cookies from "universal-cookie/es6";
const cookies = new Cookies();

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


export  function login()
{
    axios.post('http://14.160.33.94:100/api',{
        command: "login",
        user: "NHU1903",
        pass: "dauxanhrauma"
    })
    .then((response)=>{
        console.log("ketqua");
        console.log(response.data);
        var Jresult = response.data;
        console.log("Status = "  +Jresult.tk_status);
        console.log("Tokent content = "  + Jresult.token_content);
        if (Jresult.tk_status == 'ok') {           
            console.log(Jresult.token_content);
            cookies.set('token',Jresult.token_content,{path:"/"});
        }
        else {
            alert("Tên đăng nhập hoặc mật khẩu sai");
        }

    })
    .catch((error)=>{
        console.log(error);
    })
}

export  function logout()
{
    cookies.set('token','reset',{path:"/"});
}
import axios from "axios";
import Cookies from "universal-cookie/es6";
import swal from "sweetalert";
const cookies = new Cookies();
axios.defaults.withCredentials = true; 
export  function login(user,pass)
{
    axios.post('http://14.160.33.94:100/api',{
        command: "login",
        user: user,
        pass: pass
    })
    .then((response)=>{
        console.log("ketqua");
        console.log(response.data);
        var Jresult = response.data;
        console.log("Status = "  +Jresult.tk_status);
        console.log("Tokent content = "  + Jresult.token_content);
        if (Jresult.tk_status == 'ok') {           
            console.log(Jresult.token_content);
            swal("Thông báo","Chúc mừng bạn, đăng nhập thành công !","success");
            //alert("Đăng nhập thành công");
            cookies.set('token',Jresult.token_content,{path:"/"});
            setTimeout(() => {
                window.location.href = "/";
              }, 1000);
            
        }
        else {
            swal("Tên đăng nhập hoặc mật khẩu sai");
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}
export  function logout()
{
    cookies.set('token','reset',{path:"/"});
    swal("Thông báo", "Đăng xuất thành công !","success");
    setTimeout(() => {
        window.location.href = "/";
      }, 2000);
}


export async function checkLogin()
{    
    let data = await axios.post('http://14.160.33.94:100/api',{
                command: "hhhhhhh"        
    });   
    return data;    
}


export  function checkLogin2()
{    
    try{
        const resp = axios.post('http://14.160.33.94:100/api',{command: "hhhhhhh" });           
        return resp.data;
    }
    catch(err){
        console.log(err);
    }
}
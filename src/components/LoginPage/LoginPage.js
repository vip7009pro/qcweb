import React, { useState } from 'react'
import { login } from '../../Api/Api';
import  '../LoginPage/LoginPage.css'

export default function LoginPage() {
    const [user,setUser] = useState('');
    const [pass,setPass] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
       login(user,pass);
      }
    return (
        <div id="login_page">
            <form id="form_login">
                <h1 className="form_heading">ĐĂNG NHẬP HỆ THỐNG</h1>
                <div className="form_group">
                    <i className="far fa-user" />
                    <input id="login_id" type="text" className="form_input" placeholder="Tên đăng nhập" onChange={e => setUser(e.target.value)}/>
                </div>
                <div className="form_group">
                    <i className="fas fa-key" />
                    <input id="login_pw" type="password" className="form_input" placeholder="Mật khẩu" onChange={e => setPass(e.target.value)}/>
                    <div id="eye">
                        <i className="far fa-eye" />
                    </div>
                </div>
                <button className="form_submit" id="login_bt" onClick={handleSubmit}>Đăng nhập</button>
            </form>
        </div>

    )
}

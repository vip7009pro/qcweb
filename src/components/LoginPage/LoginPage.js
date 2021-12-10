import React, { useState } from 'react'
import { login } from '../../Api/Api';
import '../LoginPage/LoginPage.css'

export default function LoginPage() {
    const [user,setUser] = useState('');
    const [pass,setPass] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
       login(user,pass);
      }
    return (
        <div id="login_page">
            <form id="form-login">
                <h1 className="form-heading">ĐĂNG NHẬP HỆ THỐNG</h1>
                <div className="form-group">
                    <i className="far fa-user" />
                    <input id="login_id" type="text" className="form-input" placeholder="Tên đăng nhập" onChange={e => setUser(e.target.value)}/>
                </div>
                <div className="form-group">
                    <i className="fas fa-key" />
                    <input id="login_pw" type="password" className="form-input" placeholder="Mật khẩu" onChange={e => setPass(e.target.value)}/>
                    <div id="eye">
                        <i className="far fa-eye" />
                    </div>
                </div>
                <button className="form-submit" id="login_bt" onClick={handleSubmit}>Đăng nhập</button>
            </form>
        </div>

    )
}

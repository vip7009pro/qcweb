import React, { useContext, useState } from 'react'
import { settangca, settangcaform } from '../../../Api/Api';
import '../FormDangKyTangCa/FormDangKyTangCa.css'
import { UserContext } from '../../../Api/Context';
import swal from 'sweetalert';
export default function FormDangKyTangCa() {
    const [userdata, setUserData] = useContext(UserContext);
    const [tangca, setTangCa] = useState('1');
    const [over_start, setOverStart] = useState('');
    const [over_finish, setOverFinish] = useState('');
    console.log(tangca);
    const handleSetTangCa = (e) => {
        if (e.target.value == 'Có tăng ca') {
            setTangCa('1');
        }
        else {
            setTangCa('0');
        }
    }
    const handleSubmit = (e) => {
        console.log("Submit clicked");
        settangcaform(tangca, userdata.EMPL_NO, over_start, over_finish)
            .then(response => {
                var Jresult = response.data;
                swal("Thông báo", Jresult, "info");
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div id="overtime"  className="formdiv"><br />
            <h3>Tăng ca</h3>
            <p>Đăng ký tăng ca trong ngày tại đây</p>
            <form id="form_dk_tangca" method="post">
                <div className="form-group">
                    <label htmlFor="tangcayesno"><b>Bạn có tăng ca hay không ?</b></label>
                    <select className="form-control" id="tangcayesno" name="tangcayesno" onChange={(e) => { handleSetTangCa(e) }}>
                        <option>Có tăng ca</option>
                        <option>Không tăng ca</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="text"><b>Thời gian bắt đầu:</b> <i>(Ví dụ 17h00p thì nhập : 1700)
                    </i></label>
                    <input type="text" className="form-control" placeholder="Giờ bắt đầu tăng ca"
                        id="over_start" name="over_start" value={over_start} onChange={(e) => { setOverStart(e.target.value) }} ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="text"><b>Thời gian kết thúc:</b> <i>(Ví dụ 20h00p thì nhập : 2000)
                    </i></label>
                    <input type="text" className="form-control" placeholder="Giờ kết thúc tăng ca"
                        id="over_finish" name="over_finish" value={over_finish} onChange={(e) => { setOverFinish(e.target.value) }}></input>
                </div>
            </form>
            <button className="btn btn-primary" id="overtime_submit" onClick={handleSubmit}>Đăng ký hôm nay</button>
            <button className="btn btn-success" id="overtime_submit_confirm">Confirm hôm qua</button>
        </div>
    )
}

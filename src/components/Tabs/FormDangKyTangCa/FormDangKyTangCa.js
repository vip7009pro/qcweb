import React, { useContext, useState } from "react";
import { generalQuery, settangca, settangcaform } from "../../../Api/Api";
import "../FormDangKyTangCa/FormDangKyTangCa.css";
import { UserContext } from "../../../Api/Context";
import swal from "sweetalert";
import moment from "moment";
export default function FormDangKyTangCa() {
  const [userdata, setUserData] = useContext(UserContext);
  const [tangca, setTangCa] = useState("1");
  const [over_start, setOverStart] = useState("");
  const [over_finish, setOverFinish] = useState("");
  const [xacnhan, setXacNhan] = useState("GD");
  const [xacnhanDate, setXacNhanDate] = useState(moment().format("YYYY-MM-DD"));
  const [confirm_worktime, setconfirm_worktime] = useState("");

  const handleSetTangCa = (e) => {
    if (e.target.value == "Có tăng ca") {
      setTangCa("1");
    } else if (e.target.value == "Không tăng ca") {
      setTangCa("0");
    }
  };

  const handleSetXacNhan = (e) => {
    if (e.target.value == "Quên giờ vào") {
      setXacNhan("GD");
    } else if (e.target.value == "Quên giờ ra") {
      setXacNhan("GS");
    } else if (e.target.value == "Quên cả giờ vào và giờ ra") {
      setXacNhan("CA");
    }
  };
  const handleSubmit = (e) => {
    settangcaform(tangca, userdata.EMPL_NO, over_start, over_finish)
      .then((response) => {
        var Jresult = response.data;
        swal("Thông báo", Jresult, "info");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit_xacnhan = (e) => {
    let regex = /\d\d\d\d-\d\d\d\d/i;

    if (regex.test(confirm_worktime) == false) {
      swal(
        "Lỗi",
        "Không đúng định dạng, yêu cầu nhập đúng định dạng : ví dụ : 0800-1700",
        "error"
      );
    } else {
      let insertData = {
        confirm_date: xacnhanDate,
        confirm_worktime: xacnhan + ":" + confirm_worktime,
      };
      generalQuery("xacnhanchamcong", insertData)
        .then((response) => {
          console.log(response.data);
          if (response.data.tk_status == "OK") {
            swal(
              "Chúc mừng",
              "Đăng ký xác nhận chấm công thành công",
              "success"
            );
          } else {
            swal(
              "Lỗi",
              "Đã xác nhận rồi ko sửa được, hoặc ngày bạn chọn chưa được điểm danh, phải điểm danh ngày đó r mới đky được",
              "error"
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div id='overtime' className='formdiv'>
      <br />
      <h3>Đăng ký tăng ca và xác nhận chấm công</h3>
      <p>Đăng ký tăng ca trong ngày tại đây</p>
      <div className='row'>
        <div className='col'>
          <form id='form_dk_tangca' method='post'>
            <div className='form-group'>
              <label htmlFor='tangcayesno'>
                <b>Bạn có tăng ca hay không ?</b>
              </label>
              <select
                style={{ width: "250px" }}
                className='form-control'
                id='tangcayesno'
                name='tangcayesno'
                onChange={(e) => {
                  handleSetTangCa(e);
                }}
              >
                <option>Có tăng ca</option>
                <option>Không tăng ca</option>                
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='text'>
                <b>Thời gian bắt đầu:</b> <i>(Ví dụ 17h00p thì nhập : 1700)</i>
              </label>
              <input
                style={{ width: "250px" }}
                type='text'
                className='form-control'
                placeholder='Giờ bắt đầu tăng ca'
                id='over_start'
                name='over_start'
                value={over_start}
                onChange={(e) => {
                  setOverStart(e.target.value);
                }}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='text'>
                <b>Thời gian kết thúc:</b> <i>(Ví dụ 20h00p thì nhập : 2000)</i>
              </label>
              <input
                style={{ width: "250px" }}
                type='text'
                className='form-control'
                placeholder='Giờ kết thúc tăng ca'
                id='over_finish'
                name='over_finish'
                value={over_finish}
                onChange={(e) => {
                  setOverFinish(e.target.value);
                }}
              ></input>
            </div>
          </form>
          <button
            className='btn btn-primary'
            id='overtime_submit'
            onClick={handleSubmit}
          >
            Đăng ký hôm nay
          </button>
        </div>

        <div className='col'>
          <form id='form_xacnhanchamcong' method='post'>
            <div className='form-group'>
              <label htmlFor='tangcayesno'>
                <b>Chọn xác nhận chấm công</b>
              </label>
              <select
                style={{ width: "250px" }}
                className='form-control'
                id='xacnhantype'
                name='xacnhantype'
                onChange={(e) => {
                  handleSetXacNhan(e);
                }}
              >
                <option>Quên giờ vào</option>
                <option>Quên giờ ra</option>
                <option>Quên cả giờ vào và giờ ra</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='date'>
                <b>Ngày quên chấm công:</b>{" "}
              </label>
              <input
                style={{ width: "250px" }}
                type='date'
                className='form-control'
                id='confirm_date'
                name='confirm_date'
                value={xacnhanDate}
                onChange={(e) => {
                  setXacNhanDate(e.target.value);
                }}
              ></input>
            </div>

            <div className='form-group'>
              <label htmlFor='text'>
                <b>Thời gian làm xác nhận:</b>{" "}
                <i>(Ví dụ 08h00p~ 17h00p thì nhập : 0800-1700)</i>
              </label>
              <input
                style={{ width: "250px" }}
                type='text'
                className='form-control'
                placeholder='Giờ vào-ra'
                id='confirm_worktime'
                name='confirm_worktime'
                value={confirm_worktime}
                onChange={(e) => {
                  setconfirm_worktime(e.target.value);
                }}
              ></input>
            </div>
          </form>
          <button
            className='btn btn-success'
            id='submit_confirm'
            onClick={(e) => {
              handleSubmit_xacnhan(e);
            }}
          >
            Xác nhận công
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react'
import '../FormPheDuyetNghi/FormPheDuyetNghi.css'

export default function FormPheDuyetNghi() {
    return (
        <div id="approve" className="container"><br />
            <h3>Leader phê duyệt nghỉ</h3>
            <p>Chỉ leader truy cập được nội dung này</p>
            <form method="post">
                <div className="form-group">
                    <label htmlFor="date"><b>Từ ngày </b></label> <br />
                    <input type="date" id="tra_from_date" name="ngaybatdau" />
                    <br />
                    <label htmlFor="date"><b>Tới ngày </b></label><br />
                    <input type="date" id="tra_to_date" name="ngayketthuc" />
                </div>
            </form>
            <button type="button" className="btn btn-primary" id="trapheduyet">Tra cứu nghỉ</button>
            <button type="button" id="changeview_duyet" className="btn btn-info"> Mở rộng/ Thu hẹp </button>
            <div className="rendered_table" id="off_approve">
                Lich su nghi
            </div>
        </div>
    )
}

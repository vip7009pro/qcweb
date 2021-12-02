import React from 'react'
import '../FormHuongDanSuDung/FormHuongDanSuDung.css'
export default function FormHuongDanSuDung() {
    return (
        <div id="huongdansd"><br />
            <h3>Hướng dẫn sử dụng hệ thống của chúng ta</h3> <br />
            <p>Đọc kỹ hướng dẫn sử dụng trước khi dùng</p><br />
            <b> Hướng dẫn sử dụng hệ thống </b><br />
            <b>0. Định nghĩa về ca. </b><br />
            Định nghĩa về CA. <br />
            Những bộ phận hành chính, và bộ phận có nhân lực đổi ca ngày đêm, sẽ được chia thành 3 team:
            Team 1, Team 2 và Team Hành Chính. Team 1, Team 2 sẽ liên tục đổi ca cho nhau ngày sang đêm, và
            đêm sang ngày.

            Ví dụ tuần này <br />
            Ca ngày gồm : Team 1 + Hành chính. <br />
            Ca đêm gồm : Team 2 <br />
            Nhưng sang tuần sau:<br />
            Ca ngày gồm : Team 2 + Hành chính. <br />
            Ca đêm gồm : Team 1 <br />
            - Chuyển ca:
            Là việc chuyển người từ Team 1 sang Team 2 hoặc sang Team Hành chính và ngược lại. <br />
            <b>1. Đăng ký xin nghỉ. </b><br />
            - Quy tắc: Chọn ca nghỉ (Ca ngày hoặc Ca đêm)<br />
            Nếu nghỉ ca ngày: Nếu chọn ngày nào thì sẽ tính nghỉ ngày đó. <br />
            Ví dụ trên form nhập <br />
            Nghỉ từ 8h ngày 10/08/2021<br />
            Nghỉ tới 17h ngày 15/08/2021<br />

            Ngày được tính nghỉ là ngày 10 tới ngày 15<br />
            Nếu nghỉ ca đêm: <br />
            Ví dụ trên form nhập <br />
            Nghỉ từ 20h ngày 10/08/2021<br />
            Nghỉ tới 05h ngày 15/08/2021<br />
            thì ngày được tính nghỉ sẽ là ngày 10 tới ngày 14<br />
            =&gt; Xin nghỉ có hiệu lực khi được phê duyệt. Sau khi đăng ký xin nghỉ, hãy liên hệ leader để
            được phê duyệt.<br />

            <b>2. Đăng ký tăng ca.</b><br />
            Hàng ngày nếu tăng ca phải vào đăng ký tăng ca. Báo cáo tăng ca gửi nhân sự sẽ dựa vào thông tin
            đăng ký của nhân viên. Vậy, k đăng ký tăng ca thì báo cáo tăng ca gửi nhân sự sẽ k có tên.<br />
            - Chú ý nhập thời gian đúng định dạng yêu cầu.<br />

            - Mặc định điểm danh xong Trạng thái tăng ca sẽ là chưa đky tăng ca và sẽ hiện ra 4 nút ở ô
            DANG_KY_TANG_CA (như hình) <br />
            - Điểm danh rồi mới đăng ký tăng ca được. <br />
            - Có thể reset trạng thái tăng ca, nếu muốn thay đổi (thời gian RESET giới hạn : 7h tới 15h30
            hàng ngày). Sau 15h30 ko thay đổi được trạng thái tăng ca nữa nhé. <br />
            =&gt; Đúng chủ trương tăng ca tự nguyện.<br />
            <b>3. Lịch sử nghỉ.</b><br />
            - Tra lại các lần xin nghỉ của người dùng. (người đăng nhập). Các thông tin về lần nghỉ và tình
            trạng phê duyệt.<br />
            <b>4. Lịch sử điểm danh</b><br />
            - Tra lại lịch sử điểm danh của bản thân trong khoảng thời gian đã chọn. (Bảng công)<br />
            <b>5. Phê duyệt nghỉ (Chỉ dành cho leader)</b><br />
            - Leader vào phê duyệt các yêu cầu xin nghỉ của công nhân, nhân viên.<br />
            - Có 3 trạng thái phê duyệt.<br />
            + Mới đầu khi công nhân, nhân viên đăng ký xin nghỉ, sẽ xuất hiện 2 nút PHÊT DUYỆT và TỪ
            CHỐI.<br />
            Sau khi PHÊ DUYỆT hoặc TỪ CHỐI, sẽ sinh ra 1 nút HỦY.<br />
            Leader có thể hủy phê duyệt, tuy nhiên sẽ k thể phê duyệt lại được nữa, mà fai làm form đăng ký
            xin nghỉ lại.<br />
            Lúc đó đơn xin nghỉ sẽ có trạng thái ĐÃ HỦY<br />
            <b>6. Điểm danh nhóm (Chỉ dành cho leader nhóm đó)</b><br />
            Các leader hàng ngày vào điểm danh thành viên trong nhóm của mình.<br />
            Cách điểm danh nhóm:
            Đăng nhập =&gt; Chọn tab điểm danh nhóm =&gt; Xác định Team đang làm việc vào ca nào
            Có tất cả 19 nhóm điểm danh: <br />
            <i>Nhóm 1.QC, PD, DATA, ISO, MISSCLEAN, SYSTEM</i><br />
            <i>Nhóm 3.IQC1</i><br />
            <i>Nhóm 5.PQC1</i><br />
            <i>Nhóm 6.PQC3</i><br />
            <i>Nhóm 7.PQC_LQCA</i><br />
            <i>Nhóm 8.PQC_LQCB</i><br />
            <i>Nhóm 9.PQC_LQC2</i><br />
            <i>Nhóm 10.PQC_LQC3</i><br />
            <i>Nhóm 11.OQC1</i><br />
            <i>Nhóm 12.OQC3</i><br />
            <i>Nhóm 13.KTXA1</i><br />
            <i>Nhóm 14.KT3U1</i><br />
            <i>Nhóm 15.CS</i><br />
            <i>Nhóm 16.DTC1</i><br />
            <i>Nhóm 22.KTXA2</i><br />
            <i>Nhóm 23.KTXB1</i><br />
            <i>Nhóm 24.KTXB2</i><br />
            <i>Nhóm 25.KT3RS1</i><br />
            <i>Nhóm 26.KT3RS2</i><br />
            1 người, 1 ngày sẽ có 3 trạng thái. <br />
            <b>LÀM, NGHỈ, CHƯA ĐIỂM DANH.</b><br />
            - Người có đăng ký xin nghỉ vào ngày điểm danh, sẽ ko thể đánh "LÀM", bắt buộc phải hủy đơn đăng
            ký nghỉ vào ngày đó mới có thể điểm danh. <br />
            <i>Danh sách chỉ hiển thị những người đang đi làm bình thường, ko tính đã nghỉ việc và nghỉ
                sinh. Nếu có người nghỉ sinh đi làm trở lại, hoặc có người đang đi làm nghỉ sinh, báo cho
                leader để thay đổi trạng thái làm việc của những người đó.</i> <br />
            Hàng ngày hoàn thành điểm danh trước 8h05 vào ca ngày, và trước 20h05 vào ca đêm.<br />
            <i><b style={{color:"blue"}}> Nếu điểm danh nhầm có thể bấm RESET để điểm danh lại, thời gian RESET
                cho phép là 07h00-&gt; 08h10 và 19h00-&gt;20h10 hàng ngày</b></i><br />
            <b>7. Điểm danh nhóm (Chỉ dành cho leader)</b><br />
            Tra cứu tình hình điểm danh theo phòng ban hoặc toàn bộ QC + Kiểm tra. <br />
            <i><b style={{color:"FF5C04"}}> Chú ý, khi có nhân viên mới, có người nghỉ việc hoặc nghỉ sinh,
                hoặc nghỉ sinh đi làm trở lại, phải lên báo leader để cập nhật và đăng ký vào hệ thống
            </b></i>
        </div>
    )
}

import moment from "moment";
import swal from "sweetalert";

export const converttoDateTimefromTime = (ipdate, iptime) => {
    let output;
    try
    {
        output = ipdate + " " + iptime.substring(0, 2) + ":" + iptime.substring(2, 4);
        if(moment(output).isValid())
        return output;
        swal("Lỗi","Lỗi định dạng ngày tháng, nhập cho đúng định dạng vào","error");
    }
    catch(ex)
    {
        swal("Lỗi","Lỗi định dạng ngày tháng, nhập cho đúng định dạng vào","error");
    }         
}
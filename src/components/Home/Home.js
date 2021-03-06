import moment from 'moment';
import React, { useState, useEffect, useContext } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { generalQuery } from '../../Api/Api';
import { UserContext } from '../../Api/Context';
import '../Home/Home.css'

export default function Home() {
    const [userdata, setUserData] = useContext(UserContext);
    const [workday, setWorkDay] = useState(0);
    const [overtimeday, setOverTimeDay] = useState(0);
    const [nghiday, setNghiDay] = useState(0);
    const [countxacnhan, setCountXacNhan] = useState(0);
    const [thuongphat,setThuongPhat] = useState({count_thuong:0, count_phat:0});

    
    const startOfYear = moment().year() + "-01-01";
    //console.log(moment().startOf('year').format('YYYY-MM-DD'));
    const now = moment(new Date());
    const start = moment(startOfYear);
    var duration = moment.duration(now.diff(start));
    var days = duration.asDays();
    //console.log("Ngay khac nhau = " + Math.floor(days));
    function getBusinessDatesCount(startDate, endDate) {
        let count = 0;
        const curDate = new Date(startDate.getTime());
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if (dayOfWeek !== 0) count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }
    days = getBusinessDatesCount(new Date(startOfYear), new Date());
    const getData = () => {
        let insertData = {
        };
        generalQuery('workdaycheck', insertData)
            .then(response => {
                //console.log(response.data.data[0].WORK_DAY);
                setWorkDay(response.data.data[0].WORK_DAY);
            })
            .catch(error => {
                console.log(error);
            })
        generalQuery('tangcadaycheck', insertData)
            .then(response => {
                //console.log(response.data.data[0].WORK_DAY);
                setOverTimeDay(response.data.data[0].TANGCA_DAY);
            })
            .catch(error => {
                console.log(error);
            })
        generalQuery('nghidaycheck', insertData)
            .then(response => {
                //console.log(response.data.data[0].WORK_DAY);
                setNghiDay(response.data.data[0].NGHI_DAY);
            })
            .catch(error => {
                console.log(error);
            })

        generalQuery('countxacnhanchamcong', insertData)
        .then(response => {
            //console.log(response.data.data[0].WORK_DAY);
            setCountXacNhan(response.data.data[0].COUTNXN);
        })
        .catch(error => {
            console.log(error);
        })

        generalQuery('countthuongphat', insertData)
        .then(response => {
            console.log(response.data.data);
            console.log(response.data.data.count_thuong[0].THUONG); 
            console.log(response.data.data.count_phat[0].PHAT);      
            setThuongPhat({count_thuong: response.data.data.count_thuong[0].THUONG, count_phat: response.data.data.count_phat[0].PHAT });                 
        })
        .catch(error => {
            console.log(error);
        })


    }
    useEffect(() => {
        getData();
        return () => {
        }
    }, [])
    const DOB = () => {
        if (userdata.DOB != null) {
            return userdata.DOB;
        }
        else {
            return '2021-12-16';
        }
    }
    return (
        <div id='homediv'/*  className='container' */>
            <h1>Th??ng tin ??i l??m c???a b???n trong n??m:</h1>
            <div id='pannelhome'>
                <div id="cot1">
                    <h5>Th??ng tin nh??n vi??n:</h5>
                    <ul>
                        <li className='emplInfoList'> H??? v?? t??n: {userdata.MIDLAST_NAME} {userdata.FIRST_NAME}</li>
                        <li className='emplInfoList'> M?? nh??n s???: {userdata.CMS_ID}</li>
                        <li className='emplInfoList'> M?? ERP: {userdata.EMPL_NO}</li>
                        <li className='emplInfoList'> Ng??y th??ng n??m sinh: {DOB().slice(0, 10)}</li>
                        <li className='emplInfoList'> Qu?? qu??n: {userdata.HOMETOWN}</li>
                        <li className='emplInfoList'> ?????a ch???: {userdata.ADD_VILLAGE}-{userdata.ADD_COMMUNE}-{userdata.ADD_DISTRICT}-{userdata.ADD_PROVINCE}</li>
                        <li className='emplInfoList'> B??? ph???n ch??nh: {userdata.MAINDEPTNAME}</li>
                        <li className='emplInfoList'> B??? ph???n ph???: {userdata.SUBDEPTNAME}</li>
                        <li className='emplInfoList'> V??? tr?? l??m vi???c: {userdata.WORK_POSITION_NAME}</li>
                        <li className='emplInfoList'> Nh??m ??i???m danh: {userdata.ATT_GROUP_CODE}</li>
                        <li className='emplInfoList'> Ch???c v???: {userdata.JOB_NAME}</li>
                    </ul>
                    
                </div>
                <div id="cot2">                 
                    <h3 className='h3h3' style={{ color: '#cc33ff' }}>1. T??? ?????u n??m ?????n gi??? c?? : {Math.floor(days)} ng??y (T??nh c??? ng??y ngh??? l??? nh??ng k t??nh ch??? nh???t)</h3> <br></br>
                    {workday} /  {Math.floor(days)}
                    <ProgressBar animated variant="success" now={Math.floor(workday / days * 100)} label={`${Math.floor(workday / days * 100)} %`}></ProgressBar>
                    <h3 className='h3h3' style={{ color: 'yellow' }}>2. S??? ng??y b???n ??i l??m : {workday} ng??y</h3> <br></br>
                    {overtimeday} /  {Math.floor(workday)}
                    <ProgressBar animated variant="warning" now={Math.floor(overtimeday / workday * 100)} label={`${Math.floor(overtimeday / workday * 100)} %`}></ProgressBar>
                    <h3 className='h3h3' style={{ color: 'blue' }}>3. S??? ng??y b???n t??ng ca : {overtimeday} ng??y</h3> <br></br>
                    <ProgressBar animated variant="info" now={Math.floor(countxacnhan / workday * 100)} label={`${Math.floor(overtimeday / workday * 100)} %`}></ProgressBar>
                    <h3 className='h3h3' style={{ color: 'rgb(121 38 222)' }}>4. S??? ng??y x??c nh???n ch???m c??ng : {countxacnhan} ng??y</h3> <br></br>
                    <h3 className='h3h3' style={{ color: 'red' }}>5. S??? ng??y b???n ????ng k?? ngh??? (ko t??nh ch??? nh???t v?? n???a ph??p): {nghiday} ng??y</h3> <br></br>   
                    <h3 className='h3h3' style={{ color: 'black' }}>6. Th?????ng ph???t: Khen th?????ng: {thuongphat.count_thuong} , K??? lu???t: {thuongphat.count_phat}</h3> <br></br>                
                </div>
            </div>
        </div>
    )
}

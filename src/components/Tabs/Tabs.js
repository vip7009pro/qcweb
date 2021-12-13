import React from 'react'
import { useState } from 'react'

import '../Tabs/Tabs.css'
import FormDangKyNghi from './FormDangKyNghi/FormDangKyNghi'
import FormDangKyTangCa from './FormDangKyTangCa/FormDangKyTangCa'
import FormDiemDanhNhom from './FormDiemDanhNhom/FormDiemDanhNhom'
import FormDiemDanhTong from './FormDiemDanhTong/FormDiemDanhTong'
import FormHuongDanSuDung from './FormHuongDanSuDung/FormHuongDanSuDung'
import FormLichSuDiLam from './FormLichSuDiLam/FormLichSuDiLam'
import FormLichSuNghi from './FormLichSuNghi/FormLichSuNghi'
import FormPheDuyetNghi from './FormPheDuyetNghi/FormPheDuyetNghi'
import FormSetTeam from './FormSetTeam/FormSetTeam'


export default function Tabs(props) {
   
   
    let formNo = props.TabName;    
    switch (formNo) {
        case '1':
            return (<div id="dkn" className="container"><FormDangKyNghi /> </div>);
            console.log("Tab dc chon:1");
            break;
        case '2':
            return (<div id="dkn" className="container"><FormDangKyTangCa /> </div>);
            console.log("Tab dc chon:2");
            break;
        case '3':
            return (<div id="dkn" className="container"><FormLichSuNghi /> </div>);
            console.log("Tab dc chon:3");
            break;
        case '4':
            return (<div id="dkn" className="container"><FormLichSuDiLam /> </div>);
            console.log("Tab dc chon:4");
            break;
        case '5':
            return (<div id="dkn" className="container"><FormPheDuyetNghi /> </div>);
            console.log("Tab dc chon:5");
            break;
        case '6':
            return (<div id="dkn" className="container"><FormDiemDanhNhom /> </div>);
            console.log("Tab dc chon:6");
            break;
        case '7':
            return (<div id="dkn" className="container"><FormDiemDanhTong /> </div>);
            console.log("Tab dc chon:7");
            break;
        case '8':
            return (<div id="dkn" className="container"><FormSetTeam /> </div>);
            console.log("Tab dc chon:8");
            break;
        case '9':
            return (<div id="dkn" className="container"><FormHuongDanSuDung /> </div>);
            console.log("Tab dc chon:9");
            break;
        default:
            return (<div id="dkn" className="container">Tham số truyền vào đéo đúng </div>);
            console.log("Tab dc chon:10");
            break;
    }
}

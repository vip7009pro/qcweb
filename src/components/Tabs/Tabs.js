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
import FormSetTeam from './FormSetTeam/FormSetTeam'
import NavMenu from '../NavMenu/NavMenu'


function Rd()
{
    return (
        <div>
            <h1>OK MA</h1>
        </div>
    )
}
export default function Tabs(props) {
    const [formNo,setFormNo] = useState(props.TabName);

    switch (formNo) {
        case '1':
            return (<div id="dkn" className="container">  <Rd/> <NavMenu/> <FormDangKyNghi /> </div>);
            break;
        case '2':
            return (<div id="dkn" className="container">  <NavMenu/> <FormDangKyTangCa /> </div>);
            break;
        case '3':
            return (<div id="dkn" className="container">  <NavMenu/> <FormLichSuNghi /> </div>);
            break;
        case '4':
            return (<div id="dkn" className="container">  <NavMenu/> <FormLichSuDiLam /> </div>);
            break;
        case '5':
            return (<div id="dkn" className="container">  <NavMenu/> <FormDiemDanhNhom /> </div>);
            break;
        case '6':
            return (<div id="dkn" className="container">  <NavMenu/> <FormDiemDanhTong /> </div>);
            break;
        case '7':
            return (<div id="dkn" className="container">  <NavMenu/> <FormSetTeam /> </div>);
            break;
        case '8':
            return (<div id="dkn" className="container">  <NavMenu/> <FormHuongDanSuDung /> </div>);
            break;
        default:
            break;
    }    
}

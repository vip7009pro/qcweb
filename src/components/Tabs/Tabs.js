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
export default function Tabs() {
    const [showForm,setShowForm] = useState(1);

    return (    
        <div id="dkn" className="container">            
            <FormDangKyNghi/> 
            <FormDangKyTangCa/>
            <FormLichSuNghi/>
            <FormLichSuDiLam/>
            <FormDiemDanhNhom/>
            <FormDiemDanhTong/>
            <FormSetTeam/>
            <FormHuongDanSuDung/>
        </div>   
    )
}

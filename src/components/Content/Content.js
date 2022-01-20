import React from 'react'
/* import NavMenu from '../NavMenu/NavMenu' */
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, NavLink } from 'react-bootstrap'
import FormDangKyNghi from '../Tabs/FormDangKyNghi/FormDangKyNghi';
import FormDangKyTangCa from '../Tabs/FormDangKyTangCa/FormDangKyTangCa';
import FormLichSuNghi from '../Tabs/FormLichSuNghi/FormLichSuNghi';
import FormLichSuDiLam from '../Tabs/FormLichSuDiLam/FormLichSuDiLam';
import FormPheDuyetNghi from '../Tabs/FormPheDuyetNghi/FormPheDuyetNghi';
import FormDiemDanhNhom from '../Tabs/FormDiemDanhNhom/FormDiemDanhNhom';
import FormDiemDanhTong from '../Tabs/FormDiemDanhTong/FormDiemDanhTong';
import FormSetTeam from '../Tabs/FormSetTeam/FormSetTeam';
import FormHuongDanSuDung from '../Tabs/FormHuongDanSuDung/FormHuongDanSuDung';
import '../Content/Content.css'
import Home from '../Home/Home';
export default function Content() {
    return (
        <div id="content">
            {/* <NavMenu/> */}
            <Router>
                <div id="navbarmenu" className='container' >
                    <div id="navv" >
                        <Navbar collapseOnSelect expand="false" expand="lg" style={{ fontSize: '14px', height: '80px', borderRadius: '5px' }}>
                            <Container>
                                <Navbar.Toggle label='Menu' />
                                <Navbar.Collapse id="basic-navbar-nav" bg='light' variant='light'>
                                    <Nav className="me-auto">
                                        <div className='navlink2'><Nav.Link eventKey="0" className='navlink' as={Link} to="/" >Home</Nav.Link></div>
                                        <div className='navlink2'><Nav.Link eventKey="1" className='navlink' as={Link} to="/dangkynghi" >Đăng ký nghỉ</Nav.Link></div>
                                        <div className='navlink2'><Nav.Link eventKey="2" className='navlink' as={Link} to="/dangkytangca" >Đăng ký tăng ca</Nav.Link></div>
                                        <div className='navlink2'><Nav.Link eventKey="3" className='navlink' as={Link} to="/lichsunghi" >Lịch sử nghỉ</Nav.Link></div>
                                        <div className='navlink2'><Nav.Link eventKey="4" className='navlink' as={Link} to="/lichsudilam" >Lịch sử đi làm</Nav.Link></div>
                                        <div className='navlink2'><Nav.Link eventKey="5" className='navlink' as={Link} to="/pheduyetnghi" >Phê duyệt nghỉ</Nav.Link></div>
                                        <div className='navlink2'><Nav.Link eventKey="6" className='navlink' as={Link} to="/diemdanhnhom" >Điểm danh nhóm</Nav.Link></div>
                                        <div className='navlink2'><Nav.Link eventKey="7" className='navlink' as={Link} to="/diemdanhtong" >Điểm danh tổng</Nav.Link></div>
                                        <div className='navlink2'><Nav.Link eventKey="8" className='navlink' as={Link} to="/dieuchuyenteam" >Điều chuyển team</Nav.Link></div>
                                        <div className='navlink2'><Nav.Link eventKey="9" className='navlink' as={Link} to="/huongdansudung" >Hướng dẫn sử dụng</Nav.Link></div>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                </div>
                <Routes>
                <Route path="/" element={<Home />} />
                    <Route path="/dangkynghi" element={<FormDangKyNghi />} />
                    <Route path="/dangkytangca" element={<FormDangKyTangCa />} />
                    <Route path="/lichsunghi" element={<FormLichSuNghi />} />
                    <Route path="/lichsudilam" element={<FormLichSuDiLam />} />
                    <Route path="/pheduyetnghi" element={<FormPheDuyetNghi />} />
                    <Route path="/diemdanhnhom" element={<FormDiemDanhNhom />} />
                    <Route path="/diemdanhtong" element={<FormDiemDanhTong />} />
                    <Route path="/dieuchuyenteam" element={<FormSetTeam />} />
                    <Route path="/huongdansudung" element={<FormHuongDanSuDung />} />
                    <Route path="*" element={<div className='container'><h1>Méo có gì ! Hãy chọn chức năng trên menu</h1></div>} />
                </Routes>
            </Router>
        </div>
    )
}

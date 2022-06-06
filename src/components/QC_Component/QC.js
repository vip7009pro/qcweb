import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PQC1 from "./PQC/PQC1/PQC1";
import PQC2 from "./PQC/PQC2/PQC2";
import PQC3 from "./PQC/PQC3/PQC3";
import PQCDATA from "./PQC/PQCDATA/PQCDATA";
import { Navbar, Container, Nav, NavDropdown, NavLink } from "react-bootstrap";
import "..//QC_Component/QC.css";
import CNDB1 from "./CNDB/CNDB1/CNDB1";
import CNDB2 from "./CNDB/CNDB2/CNDB2";
import Scanner from "./Scanner/Scanner";
import Content from "../Content/Content";
import FormDangKyNghi from "../Tabs/FormDangKyNghi/FormDangKyNghi";
import FormDangKyTangCa from "../Tabs/FormDangKyTangCa/FormDangKyTangCa";
import Home from "../Home/Home";
import FormLichSuDiLam from "../Tabs/FormLichSuDiLam/FormLichSuDiLam";
import FormPheDuyetNghi from "../Tabs/FormPheDuyetNghi/FormPheDuyetNghi";
import FormDiemDanhNhom from "../Tabs/FormDiemDanhNhom/FormDiemDanhNhom";
import FormDiemDanhTong from "../Tabs/FormDiemDanhTong/FormDiemDanhTong";
import FormSetTeam from "../Tabs/FormSetTeam/FormSetTeam";
import FormHuongDanSuDung from "../Tabs/FormHuongDanSuDung/FormHuongDanSuDung";
import FormLichSuNghi from "../Tabs/FormLichSuNghi/FormLichSuNghi";
import OQC1 from "./OQC/OQC1/OQC1";
export default function QC() {
  return (
    <Router>
      <Banner />
      <div id='navbarmenu' /* className='container' */>
        <div id='navv'>
          <Navbar
            collapseOnSelect
            expand='false'
            id='navbar1'
            bg='light'
            variant='dark'
          >
            <Container>
              <NavDropdown title='HR QC' id='basic-nav-dropdown'>
                <div>
                  <Nav.Link eventKey='1' as={Link} to='/hr/home'>
                    Home
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/hr/dangkynghi'>
                    Đăng ký nghỉ
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/hr/dangkytangca'>
                    Đăng ký tăng ca
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/hr/lichsunghi'>
                    Lịch sử nghỉ
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/hr/lichsudilam'>
                    Lịch sử đi làm
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/hr/pheduyetnghi'>
                    Phê duyệt nghỉ
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/hr/diemdanhnhom'>
                    Điểm danh nhóm
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/hr/diemdanhtong'>
                    Điểm danh tổng
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/hr/dieuchuyenteam'>
                    Điều chuyển team
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/hr/huongdansudung'>
                    Hương dẫn sử dụng
                  </Nav.Link>
                </div>
              </NavDropdown>
              <NavDropdown title='PQC' id='basic-nav-dropdown'>
                <div>
                  <Nav.Link eventKey='1' as={Link} to='/pqc/pqc1'>
                    PQC1
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/pqc/pqc2'>
                    PQC2
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/pqc/pqc3'>
                    PQC3
                  </Nav.Link>
                </div>
                <NavDropdown.Divider />
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/pqc/pqc4'>
                    Tra DATA
                  </Nav.Link>
                </div>
              </NavDropdown>
              <NavDropdown title='OQC' id='basic-nav-dropdown'>
                <div>
                  <Nav.Link eventKey='1' as={Link} to='/oqc/oqc1'>
                    OQC1
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/pqc/pqc2'>
                    PQC2
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/pqc/pqc3'>
                    PQC3
                  </Nav.Link>
                </div>
                <NavDropdown.Divider />
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/pqc/pqc4'>
                    Tra DATA
                  </Nav.Link>
                </div>
              </NavDropdown>
            </Container>
          </Navbar>
        </div>
        <Routes>
          <Route path='/pqc' element={<PQCDATA />} />
          <Route path='/cndb1' element={<CNDB1 />} />
          <Route path='/cndb2' element={<CNDB2 />} />
          <Route path='/cndb5' element={<PQCDATA />} />
          <Route path='/cndb3' element={<PQC3 />} />
          <Route path='/cndb4' element={<PQCDATA />} />
          <Route path='/pqc/pqc1' element={<PQC1 />} />
          <Route path='/pqc/pqc2' element={<PQC2 />} />
          <Route path='/pqc/pqc3' element={<PQC3 />} />
          <Route path='/pqc/pqc4' element={<PQCDATA />} />
          <Route path='/oqc/oqc1' element={<OQC1 />} />
          <Route path='/scanner' element={<Scanner />} />
          <Route path='/hr' element={<Content />} />
          <Route path='/hr/home' element={<Home />} />
          <Route path='/hr/dangkynghi' element={<FormDangKyNghi />} />
          <Route path='/hr/dangkytangca' element={<FormDangKyTangCa />} />
          <Route path='/hr/lichsunghi' element={<FormLichSuNghi />} />
          <Route path='/hr/lichsudilam' element={<FormLichSuDiLam />} />
          <Route path='/hr/pheduyetnghi' element={<FormPheDuyetNghi />} />
          <Route path='/hr/diemdanhnhom' element={<FormDiemDanhNhom />} />
          <Route path='/hr/diemdanhtong' element={<FormDiemDanhTong />} />
          <Route path='/hr/dieuchuyenteam' element={<FormSetTeam />} />
          <Route path='/hr/huongdansudung' element={<FormHuongDanSuDung />} />
          <Route
            path='*'
            element={<h1>Méo có gì ! Hãy chọn chức năng trên menu</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}

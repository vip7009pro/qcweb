import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
import InfoPanel from "../InfoPanel/InfoPanel";
import OQC from "./OQC/OQC";
import PQC from "./PQC/PQC";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PQC1 from "./PQC/PQC1/PQC1";
import PQC2 from "./PQC/PQC2/PQC2";
import PQC3 from "./PQC/PQC3/PQC3";
import PQCDATA from "./PQC/PQCDATA/PQCDATA";
import { multilevelnavbar } from "../../jq";
import { Navbar, Container, Nav, NavDropdown, NavLink } from "react-bootstrap";
import "..//QC_Component/QC.css";
import CNDB1 from "./CNDB/CNDB1/CNDB1";
import CNDB2 from "./CNDB/CNDB2/CNDB2";
import Scanner from "./Scanner/Scanner";


export default function QC() {
  return (
    <Router>
      <Banner />
      <div id='navbarmenu' className='container'>
        <div id='navv'>
          <Navbar
            collapseOnSelect
            expand='false'           
            style={{ fontSize: "14px", height: "80px", borderRadius: "5px" }}
          >
            <Container>
              <NavDropdown title='PQC' id='basic-nav-dropdown'>
                <NavDropdown title='Submenu1' className='sub1'>
                  <Nav.Link eventKey='0' as={Link} to='/'>
                    Home
                  </Nav.Link>
                  <Nav.Link eventKey='1' as={Link} to='/dangkynghi'>
                    Đăng ký nghỉ
                  </Nav.Link>
                </NavDropdown>
                <NavDropdown title='Submenu2' className='sub1'>
                  <Nav.Link eventKey='0' as={Link} to='/'>
                    Home
                  </Nav.Link>
                  <Nav.Link eventKey='1' as={Link} to='/dangkynghi'>
                    Đăng ký nghỉ
                  </Nav.Link>
                </NavDropdown>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/dangkytangca'>
                    Đăng ký tăng ca
                  </Nav.Link>
                </div>
                <NavDropdown.Divider />
                <div>
                  <Nav.Link eventKey='0' as={Link} to='/'>
                    Home
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='1' as={Link} to='/dangkynghi'>
                    Đăng ký nghỉ
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/dangkytangca'>
                    Đăng ký tăng ca
                  </Nav.Link>
                </div>
                <div>
                  <Nav.Link eventKey='2' as={Link} to='/scanner'>
                   Scanner
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
          <Route path='/scanner' element={<Scanner />} />
          <Route
            path='*'
            element={<h1>Méo có gì ! Hãy chọn chức năng trên menu</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}

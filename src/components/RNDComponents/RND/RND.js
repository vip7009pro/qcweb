import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import { Navbar, Container, Nav, NavDropdown, NavLink} from 'react-bootstrap'
import '..//RND/RND.css'
import PQCDATA from '../../QC_Component/PQC/PQCDATA/PQCDATA';
import CNDB1 from '../../QC_Component/CNDB/CNDB1/CNDB1';
import CNDB2 from '../../QC_Component/CNDB/CNDB2/CNDB2';
import PQC3 from '../../QC_Component/PQC/PQC3/PQC3';
import PQC1 from '../../QC_Component/PQC/PQC1/PQC1';
import PQC2 from '../../QC_Component/PQC/PQC2/PQC2';
import Banner from '../../Banner/Banner';

export default function RND() {
    return (
        <Router>
            <div id="navbarmenu" className='container' >
                <Banner />
               
                <div id="navv" >
                    <Navbar expand="lg" variant="light" style={{ height: '80px', borderRadius: '5px', backgroundColor: '#74ED25' }}>
                        <Container>
                        <Nav.Link as={Link} to="/" >RND DATA SYSTEM</Nav.Link>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">                                    
                                    {/* <Link className="link1" to="/cndb"><Nav.Link href="#/cndb">CHẤP NHẬN ĐẶC BIỆT</Nav.Link></Link> */}
                                    <NavDropdown title="QUẢN LÝ BOM" id="basic-nav-dropdown">
                                        <Nav.Link as={Link} to="/cndb1" ><NavDropdown.Item href="#1">TRA CỨU BOM</NavDropdown.Item></Nav.Link>
                                        <Nav.Link as={Link} to="/cndb2" ><NavDropdown.Item href="#1">THÊM MỚI BOM</NavDropdown.Item></Nav.Link>
                                        <NavDropdown.Divider />
                                        <Nav.Link as={Link} to="/cndb5" ><NavDropdown.Item href="#1">SO SÁNH BOM</NavDropdown.Item></Nav.Link>
                                        <NavDropdown.Divider />
                                        <Nav.Link as={Link} to="/cndb3" ><NavDropdown.Item href="#1">SỬA BOM</NavDropdown.Item></Nav.Link>                                                                   
                                    </NavDropdown>
                                    <NavDropdown title="IQC" id="basic-nav-dropdown" >
                                        <Link className="link" to="/pqc/pqc1" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC SETTING</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc2" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC CHECKSHEET</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc3" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC DEFECT</NavDropdown.Item></Link>
                                        <NavDropdown.Divider />
                                        <Link className="link" to="/pqc/pqc4" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">TRA CỨU PQC DATA</NavDropdown.Item></Link>
                                    </NavDropdown>
                                    <NavDropdown title="PQC" id="basic-nav-dropdown">
                                        <Link className="link" to="/pqc/pqc1" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC SETTING</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc2" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC CHECKSHEET</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc3" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC DEFECT</NavDropdown.Item></Link>
                                        <NavDropdown.Divider />
                                        <Link className="link" to="/pqc/pqc4" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">TRA CỨU PQC DATA</NavDropdown.Item></Link>
                                    </NavDropdown>
                                    <NavDropdown title="OQC" id="basic-nav-dropdown">
                                        <Link className="link" to="/pqc/pqc1" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC SETTING</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc2" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC CHECKSHEET</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc3" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC DEFECT</NavDropdown.Item></Link>
                                        <NavDropdown.Divider />
                                        <Link className="link" to="/pqc/pqc4" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#">TRA CỨU PQC DATA</NavDropdown.Item></Link>
                                    </NavDropdown>
                                    <NavDropdown title="ĐỘ TIN CẬY" id="basic-nav-dropdown">
                                        <Link className="link" to="/pqc/pqc1" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC SETTING</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc2" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC CHECKSHEET</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc3" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC DEFECT</NavDropdown.Item></Link>
                                        <NavDropdown.Divider />
                                        <Link className="link" to="/pqc/pqc4" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">TRA CỨU PQC DATA</NavDropdown.Item></Link>
                                    </NavDropdown>
                                    <NavDropdown title="CS" id="basic-nav-dropdown">
                                        <Link className="link" to="/pqc/pqc1" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC SETTING</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc2" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC CHECKSHEET</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc3" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC DEFECT</NavDropdown.Item></Link>
                                        <NavDropdown.Divider />
                                        <Link className="link" to="/pqc/pqc4" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">TRA CỨU PQC DATA</NavDropdown.Item></Link>
                                    </NavDropdown>
                                    <NavDropdown title="INSPECTION" id="basic-nav-dropdown">
                                        <Link className="link" to="/pqc/pqc1" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC SETTING</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc2" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC CHECKSHEET</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc3" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC DEFECT</NavDropdown.Item></Link>
                                        <NavDropdown.Divider />
                                        <Link className="link" to="/pqc/pqc4" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">TRA CỨU PQC DATA</NavDropdown.Item></Link>
                                    </NavDropdown>
                                    <NavDropdown title="DATA CHUNG" id="basic-nav-dropdown">
                                        <Link className="link" to="/pqc/pqc1" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC SETTING</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc2" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC CHECKSHEET</NavDropdown.Item></Link>
                                        <Link className="link" to="/pqc/pqc3" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PQC DEFECT</NavDropdown.Item></Link>
                                        <NavDropdown.Divider />
                                        <Link className="link" to="/pqc/pqc4" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">TRA CỨU PQC DATA</NavDropdown.Item></Link>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <Routes>
                    <Route path="/pqc" element={<PQCDATA />} />
                    <Route path="/cndb1" element={<CNDB1 />} />
                    <Route path="/cndb2" element={<CNDB2 />} />
                    <Route path="/cndb5" element={<PQCDATA />} />
                    <Route path="/cndb3" element={<PQC3 />} />
                    <Route path="/cndb4" element={<PQCDATA />} />

                    <Route path="/pqc/pqc1" element={<PQC1 />} />
                    <Route path="/pqc/pqc2" element={<PQC2 />} />
                    <Route path="/pqc/pqc3" element={<PQC3 />} />
                    <Route path="/pqc/pqc4" element={<PQCDATA />} />
                    <Route path="*" element={<h1>Méo có gì ! Hãy chọn chức năng trên menu</h1>} />
                </Routes>
            </div>
        </Router>
    )
}
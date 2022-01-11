import React, { useEffect } from 'react'
import Banner from '../Banner/Banner'
import InfoPanel from '../InfoPanel/InfoPanel'
import OQC from './OQC/OQC'
import PQC from './PQC/PQC'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import PQC1 from './PQC/PQC1/PQC1'
import PQC2 from './PQC/PQC2/PQC2'
import PQC3 from './PQC/PQC3/PQC3'
import PQCDATA from './PQC/PQCDATA/PQCDATA'
import { multilevelnavbar } from '../../jq'
import { Navbar, Container, Nav, NavDropdown, NavLink} from 'react-bootstrap'
import '..//QC_Component/QC.css'
import CNDB1 from './CNDB/CNDB1/CNDB1'
import CNDB2 from './CNDB/CNDB2/CNDB2'
export default function QC() {
    return (
        <Router>
            <div id="navbarmenu" className='container' >
                <Banner />
               
                <div id="navv" >
                    <Navbar expand="lg" variant="light" style={{ height: '80px', borderRadius: '5px', backgroundColor: '#74ED25' }}>
                        <Container>
                        <Nav.Link as={Link} to="/" >QC DATA SYSTEM</Nav.Link>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">                                    
                                    {/* <NavDropdown title="IQC" id="basic-nav-dropdown" >
                                        <Nav.Link as={Link} to="/pqc/pqc1" >PQC SETTING</Nav.Link>
                                        <Nav.Link as={Link} to="/pqc/pqc2" >PQC CHECKSHEET</Nav.Link>
                                        <Nav.Link as={Link} to="/pqc/pqc3" >PQC DEFECT</Nav.Link>
                                        <NavDropdown.Divider />
                                        <Nav.Link as={Link} to="/pqc/pqc4" >PQC DATA</Nav.Link>                                       
                                    </NavDropdown>
 */}
                                    {/* <Link className="link1" to="/cndb"><Nav.Link href="#/cndb">CHẤP NHẬN ĐẶC BIỆT</Nav.Link></Link> */}
                                    <NavDropdown title="CHẤP NHẬN ĐẶC BIỆT" id="basic-nav-dropdown" >
                                        <Link className="link" to="/cndb1" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">ĐĂNG KÝ CNĐB</NavDropdown.Item></Link>
                                        <Link className="link" to="/cndb2" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">UPDATE LOT NO CNĐB</NavDropdown.Item></Link>  
                                        <NavDropdown.Divider />
                                        <Link className="link" to="/cndb5" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">PHÊ DUYỆT CNĐB</NavDropdown.Item></Link>                                      
                                        <NavDropdown.Divider />
                                        <Link className="link" to="/cndb3" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">TRA CỨU CNĐB</NavDropdown.Item></Link>
                                        <Link className="link" to="/cndb4" style={{ textDecoration: 'none' }}><NavDropdown.Item href="#1">TRA CỨU LOT LIỆU CNĐB</NavDropdown.Item></Link>
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
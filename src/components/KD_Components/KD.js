import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { multilevelnavbar } from "../../jq";
import { Navbar, Container, Nav, NavDropdown, NavLink } from "react-bootstrap";
import Banner from "../Banner/Banner";

export default function KD() {
  return (
    <Router>
      <Banner />
      <div id='navbarmenu' className='container'>
        <div id='navv'>
          <Navbar
            collapseOnSelect
            expand='false'
            expand='lg'
            style={{ fontSize: "14px", height: "80px", borderRadius: "5px" }}
          >
            <Container>
              <NavDropdown title='FCST' id='basic-nav-dropdown'>
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
          <Route
            path='*'
            element={<h1>Méo có gì ! Hãy chọn chức năng trên menu</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}

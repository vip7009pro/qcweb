import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import PQC1 from './PQC1/PQC1'
import PQC2 from './PQC2/PQC2'
import PQC3 from './PQC3/PQC3'
import '..//PQC/PQC.css'
import PQCDATA from './PQCDATA/PQCDATA';
import Draggable from 'react-draggable';
export default function PQC() {
    return (
        <>
            <Router>
                <div id="pqc_menu">
                    <nav id="pqc_nav">
                        <ul id="pqc_menu_list" className='container  nav nav-tabs'>
                            <li className='pqc_menu_item'>
                                <Link className="link" to="/pqc1">PQC SETTING</Link>
                            </li>
                            <li className='pqc_menu_item'>
                                <Link className="link" to="/pqc2">PQC CHECKSHEET</Link>
                            </li>
                            <li className='pqc_menu_item'>
                                <Link className="link" to="/pqc3">PQC DEFECT</Link>
                            </li>
                            <li className='pqc_menu_item'>
                                <Link className="link" to="/pqc4">PQC DATA</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/pqc1" element={<PQC1 />} />
                        <Route path="/pqc2" element={<PQC2 />} />
                        <Route path="/pqc3" element={<PQC3 />} /> 
                        <Route path="/pqc4" element={<PQCDATA/>} />                         
                    </Routes>
                </div>
            </Router>
        </>
    )
}

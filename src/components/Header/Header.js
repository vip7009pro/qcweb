import React from 'react'
import Banner from '../Banner/Banner'
import InfoPanel from '../InfoPanel/InfoPanel'
import '../Header/Header.css'
export default function Header(props) {
    return (  
        <div className="container">
            <Banner />
            <InfoPanel />
        </div>
    )
}

import React from 'react'
import Draggable from 'react-draggable'
import Banner from '../Banner/Banner'
import InfoPanel from '../InfoPanel/InfoPanel'
import PQC from './PQC/PQC'
export default function QC() {
    return (
        <div className='container'> 
            <Banner/>
            <InfoPanel/>
            <PQC/>               
        </div>
    )
}

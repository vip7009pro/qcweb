import React, { useState } from 'react'
import BarcodeReader from 'react-barcode-reader'
 

export default function Scanner() {
    const [data,setData] = useState('not found');
    const handleError = (e)=>{
        console.log(e);
    }
    const handleScan = (e)=> {
        console.log(e);
        setData(e);
    }
  return (
    <div>
        <BarcodeReader
          onError={(e)=> {handleError(e)}}
          onScan={(e)=> {handleScan(e)}}
          />
        <p>{data}</p>
    </div>
  )
}

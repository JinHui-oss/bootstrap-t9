import React from 'react'
import { Button } from 'react-bootstrap'
import '../KitQR/KitQR.css'

function QRIndex() {
  return (
    <div className='QR-view'>
      <div className='header'>
        <h2>Kit QT</h2>
        <p>View all the created QR Code for the dementia Kits</p>
        <Button href="/QRIndex/Create">Add</Button>
        <hr></hr>

      </div>
    </div>
  )
}

export default QRIndex

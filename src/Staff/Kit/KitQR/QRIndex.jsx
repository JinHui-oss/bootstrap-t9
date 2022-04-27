import React from 'react'
import { Button } from 'react-bootstrap'

function QRIndex() {
  return (
    <div>
      <div>
        <h2>Kit QT</h2>
        <p>View all the created QR Code for the dementia Kits</p>
        <Button href="/QRIndex/create">Add</Button>
        <hr></hr>
      </div>
    </div>
  )
}

export default QRIndex

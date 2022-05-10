// react
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// bootstrap
import { Button, Form } from 'react-bootstrap';

// firebase inital setup
import { db } from '../../../Database/firebase';

// firebase import function from firestore
import { 
  collection,
  getDoc,
  doc
} from 'firebase/firestore'


function QREdit() {
 
  // create a variable to store data thru usestate 
  const [kitQR, setKitQR] = useState([]);
  
  // find the data from the firestore based on the 
  // name of the table in database and stored into the 
  // variable.
  const kitQRCollectionRef = collection(db,"KitQR");
  
  // reterieve the document id and stored to variable
  const { id } = useParams();

  return (
    // body content of the web page
    <div className='details-content'>
    
      {/* header of the page */}
      <div className='header'>
        <h2>Kit QR Details </h2>
        <p>View the document data ensure it is up to date.</p>
        <hr />
      </div>

      <Form className="form-create">
        <label className='KitId'>Id </label>
          <input type="text" className="form-control" id="KitName" 
          placeholder="Document Id"
          required readOnly />

        <label className='KitName'>Name </label>
          <input type="text" className="form-control" id="KitName" 
          placeholder="Dementia Kit xx - example"
          required />
        
        <label className='KitPhone'>Phone Number </label>
          <input type="number" className="form-control" id="KitName" 
          placeholder="9761 1120"
          required />

        <label className='KitEmail'>Phone Number </label>
          <input type="Email" className="form-control" id="KitName" 
          placeholder="abc@gmail.com"
          required />
       </Form>

      <br />
      {/* Button */}
      <Button href="/QRIndex">Back</Button>
      <br/>
      <Button className='submit' type='submit' >Submit</Button>
    </div>
  )
}

export default QREdit

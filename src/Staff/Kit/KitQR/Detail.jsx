// react
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// bootstrap
import { Button } from 'react-bootstrap';

// firebase inital setup
import { db } from '../../../Database/firebase';

// firebase import function from firestore
import { 
  collection,
  getDoc,
  doc
} from 'firebase/firestore'

function QRDetail() {
  
  const [kitQR, setKitQR] = useState([]);
  const kitQRCollectionRef = collection(db,"KitQR");
  const { id } = useParams();
  
  //
  useEffect(() => {
    const getKit = async () => {
      const docRef = doc(db, "KitQR", id);
      const docSnap = await getDoc(docRef);
      
      // check for display output
      // console.log(docSnap);
      
      // check condition
      if (docSnap.exists()) 
      {
        // display the output if the record exist 
        // create a variable to store the data output.
        let data =  docSnap.data();
        // console.log(data)
        
        setKitQR.state ={
          KitName: data.KitName,
          PhoneNumber: data.PhoneNumber,
          Email: data.Email,
          quantity: data.quantity,
          StartDate: data.StartDate.toDate().toString(),
          EndDate: data.EndDate.toDate().toString(),
        }
        //
        setKitQR(setKitQR.state)
       
        // check for the display output
        // console.log(setKitQR.state)
        
      } 
      else 
      {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    };
    getKit();

  // eslint-disable-next-line 
  }, [kitQRCollectionRef])
 
  return (
    // body content of the web page
    <div className='details-content'>
      
      {/* header of the page */}
      <div className='header'>
        <h2>Kit QR Details </h2>
        <p>View the document data ensure it is up to date.</p>
        <hr />
      </div>

      {/* body content of the details */}
      <div className='content-body'>
        <p>Document Id: <br /> {id}</p>
        <p>Kit Name: <br /> {kitQR.KitName}</p>
        <p>Phone Number: <br /> {kitQR.PhoneNumber}</p>
        <p>Email: <br/> {kitQR.Email}</p>
        <p>Start Date: <br/> {kitQR.StartDate}</p>
        <p>End Date: <br /> {kitQR.EndDate}</p>
        <p>Quantity: <br />{kitQR.quantity}</p>
      </div>
        
        {/* Button */}
        <Button href="/Kit">Back</Button>
        <br /> 
        <br />
        <Button href="#">Update</Button>
    </div>
  )
}

export default QRDetail

// react
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
  
  // create a variable to store data thru usestate 
  const [kitQR, setKitQR] = useState([]);
  const [name, setText] = useState("");
  
  // find the data from the firestore based on the 
  // name of the table in database and stored into the 
  // variable.
  const kitQRCollectionRef = collection(db,"KitQR");
  
  // reterieve the document id and stored to variable
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
          Quantity: data.Quantity,
          StartDate: data.StartDate.toDate().toString(),
          EndDate: data.EndDate.toDate().toString(),
        }
        // reterive the data and stored into a setkit
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
        <label for="DocumentId">Document Id:</label>
        <p>{id}</p>
        
        <label for="KitName">Kit Name: </label>
        <p>{kitQR.KitName}</p>
        
        <label for="PhoneNumber">Phone Number:</label>       
        <p>{kitQR.PhoneNumber}</p>
        
        <label for="Email">Email:</label>
        <p>{kitQR.Email}</p>
        
        <label for="StartDate">Start Date:</label>
        <p>{kitQR.StartDate}</p>
        
        <label for="EndDate">End Date:</label> 
        <p>{kitQR.EndDate}</p>
        
        <label for="Quantity">Quantity:</label>
        <p>{kitQR.Quantity}</p>
      </div>
        
        {/* Button */}
        <Button href="/QRIndex">Back</Button>
        <br /> 
        <br />
        <Link to ={`/KitQR/Edit/${id}`}>link</Link>
    </div>
  )
}

export default QRDetail

// react
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// bootstrap
import { Button, Card } from 'react-bootstrap';

// firebase inital setup
import { db } from '../../../Database/firebase';

// firebase import function from firestore
import { 
  collection,
  getDoc,
  doc,
  Timestamp,
  deleteDoc
} from 'firebase/firestore'
import '../KitQR/KitQR.css'

function QRDetail() {
  
  // create a variable to store data thru usestate 
  const [kitQR, setKitQR] = useState([]);
  //const [name, setText] = useState("");
  
  // find the data from the firestore based on the 
  // name of the table in database and stored into the 
  // variable.
  const kitQRCollectionRef = collection(db,"KitQR");
  
  // reterieve the document id and stored to variable
  const { id } = useParams();
  const navigate = useNavigate();
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
          id: id,
          KitName: data.KitName,
          PhoneNumber: data.PhoneNumber,
          Email: data.Email,
          Quantity: data.Quantity,
          StartDate: data.StartDate,
          EndDate: data.EndDate,
          PhotoUrl: data.PhotoUrl,
          CreatedAt: data.CreatedAt
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

  const deleteKit = async (id) => {
  
    //e.preventDefault();
    const deletedocRef = doc(db, "KitQR", id);
    await deleteDoc(deletedocRef);
    navigate("/QRIndex")
    console.log("Records deleted Successfully");
}
 
  return (
    // body content of the web page
    <div className='qrdetails-content'>
      
      {/* header of the page */}
      <div className='header'>
        <h2>Kit QR Details </h2>
        <p>View the document data ensure it is up to date.</p>
        <hr />
      </div>

        {/* body content of the kit pictures */}
        <div className='details-pictures'>
          <div className="d-flex justify-content-around">
            <Card>
              <Card.Body>
                 {/* eslint-disable-next-line */}
                <p><img src={kitQR.PhotoUrl}></img></p>
              </Card.Body>
            </Card>
          </div>
        <br />
         {/* Edit Button */}
         <Button className='details-edit' href ={`/QRIndex/Edit/${id}`}>
        {/* eslint-disable-next-line */}
          <img src='https://cdn-icons-png.flaticon.com/512/227/227104.png'></img>  
           Edit</Button>
        </div>

         {/* product title and quantity information */} 
         <div className='details-title'>
          <h2>{kitQR.KitName}</h2>
          <hr />
          <h2>Quantity: {kitQR.Quantity}</h2>
          <br />
        </div>

        {/* body content of the kit information */}
        <div className='details-information'>
        <Card className="details-information-title">
            <Card.Title>
                <h3>Kit Content Information</h3>
            </Card.Title>
          </Card>
          <Card className="details-information-body">
            <Card.Body>
              <p>User Id: <br /> {id}</p>
              <p>Contact Number: <br /> {kitQR.PhoneNumber}</p>
              <p>Email: <br />{kitQR.Email}</p>
              <p>Start Date: <br /> {kitQR.StartDate}</p>
              <p>End Date: <br />{kitQR.EndDate}</p>
              <p>Created At: <br /> {kitQR.CreatedAt}</p>
            
            </Card.Body>
          </Card>
        </div>
        
      {/* body content of the details */}
        
        {/* Button */}
        <Button className ="QRBack"href="/QRIndex">Back</Button>
        <Button onClick={() => {deleteKit(id)}} className="QREdit">Archive</Button>
        
    </div>
  )
}

export default QRDetail

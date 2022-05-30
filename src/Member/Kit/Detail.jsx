// react
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// bootstrap
import { Button, Card } from 'react-bootstrap';

// firebase inital setup
import { db } from '../../Database/firebase';

// firebase import function from firestore
import { 
  collection,
  getDoc,
  doc
} from 'firebase/firestore'

function LoanDetail() {
    const [kit,setKit] = useState([]);
    const kitCollectionRef = collection(db, "Kit");
    
    // create variable to reterive the specifc document id
    const { id } = useParams()
  
    useEffect(() => {
      const getKit = async () => {
        const docRef = doc(db, "Kit", id);
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
          
          setKit.state ={
            id : id,
            Name: data.Name,
            Description: data.Description,
            Quantity: data.Quantity,
            CreatedAt: data.CreatedAt,
            PhotoUrl: data.PhotoUrl
          }
          // reterive the data and stored into a setkit
          setKit(setKit.state)
         
          // check for the display output
          // console.log(setKit.state)
          
        } 
        else 
        {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      };
      getKit();
  
    // eslint-disable-next-line 
    }, [kitCollectionRef])
  
     
     return (
      // Kit infomation details for specific page
      <div className='details-content'>
         {/* header of the website */}
         <div className='details-header'>
            <h2>Kit Details </h2>
            <p>View all content inside the kit</p>
            <hr />
          </div>
  
          {/* body content of the kit pictures */}
          <div className='details-pictures'>
            <div className="d-flex justify-content-around">
              <Card>
                <Card.Body>
                   {/* eslint-disable-next-line */}
                  <p><img src={kit.PhotoUrl}></img></p>
                </Card.Body>
              </Card>
            </div>
          <br />
          
          {/* product title and quantity information */} 
          <div className='details-title'>
            <h2>{kit.Name}</h2>
            <hr />
            <h2>Quantity: {kit.Quantity}</h2>
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
                <p>About the Kit: <br /> {kit.Description}</p>
                <p>Created At: <br /> {kit.CreatedAt}</p>
              </Card.Body>
            </Card>
          {/* Back Button */}
          </div>
          <Button href="/Member/Kit" className='details-back'>Back</Button>
          {/* Reserve Button */}
          <Button href={`/Member/Kit/Create/${kit.id}`} className='details-back'>Reserve</Button>
        </div>
      </div>
      )
    }

export default LoanDetail

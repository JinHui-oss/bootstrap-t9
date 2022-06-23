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
  doc,
  getDocs,
} from 'firebase/firestore'

import { query, where } from "firebase/firestore";  
import { getAuth } from 'firebase/auth';
import { UserAuth } from "../../Scripts/authContext" 

import "../Kit/Kit.css"

function LoanDetail() {
    
  const [kit,setKit] = useState([]);
    const { } = UserAuth();
    const [kitborrowed,setKitBorrowed] = useState([]);
    const [started, setstarted] = useState("")
    const [isDisabled, setDisabled] = useState(false);
    const { id } = useParams();
    const kitCollectionRef1 = collection(db, "KitBorrowed");
    
  
    // create variable to reterive the specifc document id
    useEffect(() => {
      const getKit = async () => {    
        const docRef = doc(db, "Kit",id)
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
        const auth = getAuth();
        const user = auth.currentUser;
        // console.log(user)
       
        if(user){
          try{
            const id = kit.Name;
            // Display check
            // console.log(id)
            
            // Composite Query 
            const q1 = query(kitCollectionRef1, where("KitName", "==", id))
            const data1 = await getDocs(q1)
  
           
            setKitBorrowed(data1.docs.map((doc) =>({...doc.data(), id: doc.id})));
            // console.log(kitborrowed)
            let i 
            for(i = 0; i <= kitborrowed.length; i++ ){
              // console.log(i)
              if(i == null){
                // reference code from
                // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
                setstarted({...data1, Quantity: i})
              }
              else{
                // reference code from
                // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
                setstarted({...data1, Quantity: i})
                
                // checked if the output displayed the correct values
                // console.log(started)
              }
            }
          }
          catch(e){
            // Display error message if needed
            // console.log(e.message)
          }
         
        }
        else 
        {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      };
      getKit()
    },[kitCollectionRef1])

    const checkbutton = async (e) => {
    
    }
    

  
    // eslint-disable-next-line 
    
     return (
      // Kit infomation details for specific page
      <div className='details-content'>
         {/* header of the website */}
         <div className='member-details-header'>
            <h2>Kit Details </h2>
            <p>View all content inside the kit</p>
            <hr />
          </div>
  
          {/* body content of the kit pictures */}
          <div className='member-details-pictures'>
            <div className="photos">
              <Card>
                <Card.Body>
                   {/* eslint-disable-next-line */}
                  <p><img src={kit.PhotoUrl}></img></p>
                </Card.Body>
              </Card>
            </div>
          <br />
          
          {/* product title and quantity information */} 
          <div className='member-details-title'>
            <h2>{kit.Name}</h2>
            <hr />
            <h2>Quantity: {kit.Quantity - started.Quantity}</h2>
            <br />
          </div>
          
          {/* body content of the kit information */}
          <div className='member-details-information'>
          <Card className="member-details-information-title">
              <Card.Title>
                  <h3>Kit Content Information</h3>
              </Card.Title>
            </Card>
            <Card className="member-details-information-body">
              <Card.Body>
                <p>User Id: <br /> {id}</p>
                <p>About the Kit: <br /> {kit.Description}</p>
                <p>Created At: <br /> {kit.CreatedAt}</p>
              </Card.Body>
            </Card>
          {/* Back Button */}
          </div>
          <Button href="/Member/Kit" className='member-details-back'>Back</Button>
          {/* Reserve Button */}
          <Button disabled={isDisabled} href={`/Member/Kit/Create/${kit.id}`} className='member-details-reserve'>Reserve
      
          </Button>
        </div>
      </div>
      )
    }

export default LoanDetail


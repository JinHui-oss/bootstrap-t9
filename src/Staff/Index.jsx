// react
import React, { useEffect, useState } from 'react';

// bootstrap
import { Card } from 'react-bootstrap';

// firebase inital setup
import { db } from '../Database/firebase';

// firebase import function from firestore
import { 
  collection,
  getDoc,
  doc,
  getDocs,
} from 'firebase/firestore'

import { query, where } from "firebase/firestore";  
import { getAuth } from 'firebase/auth';
import { UserAuth } from "../Scripts/authContext" 

//
import "../Staff/Index.css"

function Index() {
  const [staff, setStaff] = useState([]);
  const StaffCollectionRef = collection(db, "Staff"); 
  // create variable to reterive the specifc document id

  // Kitborrowed
  const [kit,setKit] = useState([]);
  const [kittotal,setKitTotal] = useState([]);
  
  // eslint-disable-next-line
  const { } = UserAuth();
  const [kitborrowed,setKitBorrowed] = useState([]);
  const [started, setstarted] = useState("")
  const [startedreturned , setstartedreturned] = useState([])
  
  const kitCollectionRef1 = collection(db, "KitBorrowed");

  // Kit
  const kitCollectionRef = collection(db, "Kit");

  
  // eslint-disable-next-line
  const { } = UserAuth();

  useEffect(() => {
    const getstaffdata = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if(user !== null){
      
      const t = user.uid;
      const docRef = doc(db, "Staff", t);
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
        
        setStaff.state = {
          uid : data.uid,
          Name: data.Name,
          PhotoUrl : data.PhotoUrl,
          Email: data.Email,
          Password: data.Password,
          Role: data.Role,
          CreatedAt: data.CreatedAt
        }
        
        // reterive the data and stored into a setkit
        setStaff(setStaff.state)
       
        // check for the display output
        // console.log(setMember.state)
        
      } 
      else 
      {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
  }
  getstaffdata();

  // eslint-disable-next-line 
  }, [StaffCollectionRef])
  
  useEffect(() => {
    const getKitBorrowed = async () => {
    
      try{
        // Composite Query 
        const q1 = query(kitCollectionRef1, where("Status", "==", "Borrowed"))
        const data1 = await getDocs(q1)

        setKitBorrowed(data1.docs.map((doc) =>({...doc.data(), id: doc.id})));
        // console.log(kitborrowed)
        // Display check
        // console.log(id)
        
        // Composite Query 
      
        // console.log(kitborrowed)
        let i 
        for(i = 0; i <= kitborrowed.length; i++ ){
          // console.log(i)
          if(i == null){
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setstarted({...data1, Total: i})
          }
          else{
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setstarted({...data1, Total: i })
            
            // checked if the output displayed the correct values
            // console.log(started)
          }
        }
      }
      catch(e){
        // Display error message if needed
        // console.log(e.message)
      }
     
    
    };
    getKitBorrowed();
   // eslint-disable-next-line  
  }, [kitCollectionRef1])

 

  useEffect(() => {
    const getKitTotal = async () => {
    
      try{
        // Composite Query 
        const q1 = query(kitCollectionRef1, where("Status", "==", "Returned"))
        const data1 = await getDocs(q1)

        setKitBorrowed(data1.docs.map((doc) =>({...doc.data(), id: doc.id})));
        // console.log(kitborrowed)
        // Display check
        // console.log(id)
        
        // Composite Query 
      
        // console.log(kitborrowed)
        let i 
        for(i = 0; i <= kitborrowed.length; i++ ){
          // console.log(i)
          if(i == null){
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setstartedreturned({...data1, Total: i})
          }
          else{
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setstartedreturned({...data1, Total: i })
            
            // checked if the output displayed the correct values
            // console.log(started)
          }
        }
      }
      catch(e){
        // Display error message if needed
        // console.log(e.message)
      }
     
    
    };
    getKitTotal();
  // eslint-disable-next-line
  }, [kitCollectionRef1])

  useEffect(() => {
    const getKit = async () => {
      const data = await getDocs(kitCollectionRef)
      setKit(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
      let i 
        for(i = 0; i <= kit.length; i++ ){
          // console.log(i)
          if(i == null){
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setKitTotal({...data, Total: i})
          }
          else{
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setKitTotal({...data, Total: i })
            
            // checked if the output displayed the correct values
            // console.log(started)
          }
        }
    };
    getKit();
   // eslint-disable-next-line  
  }, [kitCollectionRef])


  return(
  <div className='staff-index'>
    <div className='staff-title'>
        <div className='staff-header'>
          <h2>{`Welcome ${staff.Name}`}, </h2>
          <h3>You have logged in at ...</h3>
          <hr />
        </div>
        <br />
        
        <div className='staff-kit'>
        <h2>Kit Status</h2>
        <hr />
        </div>
       
        <div className='kitborrowed-total'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Total Borrowed</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Dementia Kit </Card.Subtitle>
          <Card.Text>
            Number: {started.Total}
          </Card.Text>
          <Card.Link href="/Staff/Borrowed">View</Card.Link>
        </Card.Body>
        </Card>
        </div>

        <br />
        <div className='kitreturned-total'>
          
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Total Returned</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Dementia Kit </Card.Subtitle>
        <Card.Text>
          Number: {startedreturned.Total}
        </Card.Text>
          <Card.Link href="/Staff/Returned">View</Card.Link>
        </Card.Body>
        </Card>
        </div>
        <br />

        <div className='kit-total'>
          <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Total</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Dementia Kit </Card.Subtitle>
          <Card.Text>
            Number: {kittotal.Total}
          </Card.Text>
          <Card.Link href="/Staff/Kit">View</Card.Link>
        </Card.Body>
        </Card>
        </div>
    </div>
 

  </div>
)
}

export default Index

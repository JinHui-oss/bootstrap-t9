import React, { useState, useEffect } from 'react'


import { useNavigate } from 'react-router-dom';

//
import { UserAuth } from "../Scripts/authContext" 

// firebase inital setup
import { db } from '../Database/firebase';

//
import { 
  collection,
  getDoc,
  doc
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
//
import "../Staff/Index.css"

function Index() {
  const [staff, setStaff] = useState([]);
  const StaffCollectionRef = collection(db, "Staff"); 
  // create variable to reterive the specifc document id

  const naviagte = useNavigate();
  const { } = UserAuth();

  useEffect(() => {
    const getdata = async () => {
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
  getdata();


  // eslint-disable-next-line 
  }, [StaffCollectionRef])
  return(
  <div className='staff-index'>
    <div className='staff-title'>
      <h1>
        {`Welcome ${staff.Name}`},
  
      </h1>
    </div>
 

  </div>
)
}

export default Index

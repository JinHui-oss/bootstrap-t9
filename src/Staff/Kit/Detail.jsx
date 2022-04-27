// react
import './Kit.css';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
//import { Link } from 'react-router-dom';

// firebase
import { db } from '../../Database/firebase';
import { collection, getDoc, doc } from 'firebase/firestore'

function Detail() {
   const [kit, setKit] = useState([]);
   //const kitCollectionRef = collection(db, "Kit");
 
   useEffect(() => {
     const getKit = async () => {
      const docRef = doc(db, "Kit", "BPSaOiRxc4zqGXssQvDb");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      
    };
     getKit();
    
   }, [])
 
   
   return (
    <div className='details-content'>
       <div className='header'>
            <h2>Kit Details </h2>

            <p>View all content inside the kit</p>
            <hr></hr>
        </div>
        <div className='table'>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          
        </Table>
      </div>
    </div>
  )
}

export default Detail

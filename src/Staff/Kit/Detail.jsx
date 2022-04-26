// react
import './Kit.css';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
//import { Link } from 'react-router-dom';

// firebase
import { db } from '../../Database/firebase';
import { collection, getDocs } from 'firebase/firestore'

function Detail() {
   const [kit, setKit] = useState([]);
   const kitCollectionRef = collection(db, "Kit");
 
   useEffect(() => {
     const getKit = async () => {
       const data = await getDocs(kitCollectionRef)
       //console.log(data);
       setKit(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
     };
     getKit();
    
   }, [kitCollectionRef])
 
   
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
          {kit.map((user) => {
          return( 
            <tbody>
              {""}
              <tr>
                <td>Kit1.jpg</td>
                <td>{user.id}</td>
                <td>{user.Name}</td>
              </tr>
            </tbody>
            );
          })}
        </Table>
      </div>
    </div>
  )
}

export default Detail

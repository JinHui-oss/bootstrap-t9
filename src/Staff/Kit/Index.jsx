// react
import './Kit.css';
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// firebase
import { db } from '../../Database/firebase';
import { collection, getDocs } from 'firebase/firestore'

function Kit() {
  const [kit, setKit] = useState([]);
  const kitCollectionRef = collection(db, "Kit");

  useEffect(() => {
    const getKit = async () => {
      const data = await getDocs(kitCollectionRef)
      console.log(data);
      setKit(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
    };
    getKit();
  }, [])


  return (
    <div className='content'>
      <div>
        <h2>xx Dementia Kit </h2>
        <p>View all the dementia Kits</p>
        <Button href="/kit/add">Add</Button>
        <hr></hr>
      </div>
      <div className='table'>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>#Id</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          {kit.map((user) => {
          return( 
            <tbody>
              {""}
              <tr>
                <td>{user.id}</td>
                <td>Kit1.jpg</td>
                <td>{user.Name}</td>
                <td><Link to ="/kit/{user.id}">link</Link></td>
              </tr>
            </tbody>
            );
          })}
        </Table>
      </div>
  </div>
)}

export default Kit;

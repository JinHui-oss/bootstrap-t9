// React
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';

// firebase
import { db } from '../../../Database/firebase';
import { collection, getDocs } from 'firebase/firestore'

// css
import '../KitQR/KitQR.css'

function QRIndex() {

  const [KitQR, setKitQR] = useState([]);
  const KitQRCollectionRef = collection (db, "KitQR")

  useEffect(() => {
    const getKitQR = async () => {
      const data = await getDocs(KitQRCollectionRef)
      //console.log(data);
      setKitQR(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
    };
    getKitQR();

   
  }, [KitQRCollectionRef])

  return (
    // the content of the webpage
    <div className='QR-view'>
      <div className='header'>
        <h2>Kit QT</h2>
        <p>View all the created QR Code for the dementia Kits</p>
        <Button href="/QRIndex/Create">Add</Button>
        <hr></hr>
      </div>
      
      {/* search function */}
      <div className='search'>
        <input /> 
        <Button>Search</Button>
      </div>
    
      {/* table infomation */}
      <div className='table'>
      <Table responsive= "md" hover>
          <thead>
            <tr className='table-header'>
              <th>Profile</th>
              <th>Id</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          {/* display table content */}
          {KitQR.map((user) => {
          return( 
            <tbody>
              {""}
              <tr>
                <td><img src={user.PhotoUrl}/></td>
                <td>{user.id}</td>
                <td>{user.KitName}</td>
                <td><Link to ={`/Staff/QRIndex/Detail/${user.id}`}>View</Link></td>
              </tr>
            </tbody>
            );
          })}
        </Table>
        </div>
      </div>
  )
}

export default QRIndex

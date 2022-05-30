// react
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// firebase
import { db, storage } from '../../Database/firebase';
import { collection, getDocs } from 'firebase/firestore'
import {
  listAll, 
  getDownloadURL,
  ref
} from 'firebase/storage'


// css


function LoanIndex() {
  //  eslint-disable-next-line
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "Staff/Kit")
  const [kit, setKit] = useState([]);
  const kitCollectionRef = collection(db, "Kit");
   

  useEffect(() => {
    const getKit = async () => {
      const data = await getDocs(kitCollectionRef)
      setKit(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
    };
    getKit();
    
  }, [kitCollectionRef])
  
  useEffect(() =>{
      listAll(imageListRef).then((response) =>{
        console.log(response)
        response.items.forEach((item) =>{
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url])
          })
        })  
      })
      //  eslint-disable-next-line
    }, [])

  return (
    <div className='content'>
      <div className='content-header'>
        <h2>Loan Dementia Kit </h2>
        <p>View and Loan the dementia Kits</p>
        <hr/>
      </div>

      {/* search function */}
      <div className='content-search'>
        <input /> 
        <Button>Search</Button>
      </div>
    
      <div className='content-table'>
          <Table responsive="md" hover>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Id</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          {kit.map((user) => {
          return( 
            <tbody>
              {""}
              <tr>
                <td>
                { /*eslint-disable-next-line */ } 
                <img src ={user.PhotoUrl} width="120px" height="120px" />
                </td>
                <td>{user.id}</td>
                <td>{user.Name}</td>
                <td><Link to ={`/Member/Kit/Detail/${user.id}`}>View</Link></td>
              </tr>
            </tbody>
            );
          })}         
        
        </Table>
      </div>
  </div>
)}

export default LoanIndex;

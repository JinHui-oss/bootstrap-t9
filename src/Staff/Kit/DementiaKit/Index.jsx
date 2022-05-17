// react
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

// firebase
import { db, storage } from '../../../Database/firebase';
import { collection, getDocs } from 'firebase/firestore'
import {
  listAll, 
  getDownloadURL,
  ref
} from 'firebase/storage'


// css
import '../DementiaKit/Kit.css'

function Kit() {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "Staff/Kit")
  const [kit, setKit] = useState([]);
  const kitCollectionRef = collection(db, "Kit");
    // create variable to reterive the specifc document id
    const { id } = useParams()

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
  }, [])

  return (
    <div className='content'>
      <div className='content-header'>
        <h2>Dementia Kit </h2>
        <p>View all the dementia Kits</p>
        <Button href="/Kit/Add">Add</Button>
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
                <img src ={user.PhotoUrl} width="120px" height="120px"/>
           
                </td>
                <td>{user.id}</td>
                <td>{user.Name}</td>
                <td><Link to ={`/Kit/Detail/${user.id}`}>View</Link></td>
              </tr>
            </tbody>
            );
          })}         
        
        </Table>
      </div>
  </div>
)}

export default Kit;

// react
import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Form } from 'react-bootstrap';
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
import '../Kit/Kit.css'


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
    //col-md-4 mb-5"

  return (
    <div className='content'>
      <div className='content-header'>
        <h2>Loan Dementia Kit </h2>
        <p>View and Loan the dementia Kits</p>
        <hr/>
      </div>

      {/* search function */}
      <div className='search-button'>
        <input type="text" placeholder="Kit Name" /> 
        <Button>Search</Button>
      </div>
    
      <div className='content-table'>
        <div className='contenthell'>
        <Row xs={1} md={3} className="g-4">
          {kit.map((user) => {
          return( 
            <Col>
            <Card>
              <Card.Img variant="top" src={user.PhotoUrl} />
              <Card.Body>
                <Card.Title>{user.Name}</Card.Title>
                <Card.Text>
                {user.Description}
                </Card.Text>
                <Button href={`/Member/Kit/Detail/${user.id}`}>view</Button>
              </Card.Body>
            </Card>
          </Col>  
            );
          })}
          </Row>   
          </div>      
      </div>
  </div>
)}

export default LoanIndex;

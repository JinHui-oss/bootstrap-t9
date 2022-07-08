// React
import React, { useState, useEffect } from 'react';
import { Button, Col, Card, Row } from 'react-bootstrap'


// firebase
import { db } from '../../../Database/firebase';
import { collection, getDocs } from 'firebase/firestore'

// css
import '../KitQR/KitQR.css'

function QRIndex(){

  const [KitQR, setKitQR] = useState([]);
  const [search, setSearch] = useState('');
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
        <Button href="/Staff/QRIndex/Create">Add</Button>
        <hr></hr>
      </div>
      
      {/* search function */}
      <div className='content-search'>
      
      <form className='input-words'>
      <input type="text" onChange={(event) => {
          setSearch(event.target.value);
          }} 
          className="form-control" 
          id="KitQuantity" 
          placeholder="Enter Borrower Name" 
          required />
        </form>
        </div>
    
      {/* table infomation */}
      <div className='table'>
        <Row xs={1} md={2} className="g-4">
          {/* display table content */}
          {KitQR.filter((val) => {
            if(search == ""){
              return val;
            }
            else if(val.LoanName.toLowerCase().includes(search.toLocaleLowerCase())){
              return val;
            }
          }).map((user) => {
          return( 
            <Col>
            <Card className='hell'>
              <Card.Img variant="top" src={user.PhotoUrl} className='kitcontent-photo' />
              <Card.Body>
                <h2>{user.LoanName}</h2>
                <Card.Text>
                {user.KitName}
                </Card.Text>
                <Button href={`/Staff/QRIndex/Detail/${user.id}`}>view</Button>
              </Card.Body>
            </Card>
            </Col>  
            );
          })}
          </Row>
        </div>
      </div>
  )
}

export default QRIndex

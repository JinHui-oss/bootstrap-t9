import React, { useState, useEffect } from 'react';
import { Row, Card, Col, Button } from 'react-bootstrap'
import '../../../../Staff/Kit/Status/Status.css'

// firebase
import { db } from '../../../../Database/firebase';
import { collection, getDocs } from 'firebase/firestore'


function StaffList() {
    const [KitQR, setKitQR] = useState([]);
    const [search, setSearch] = useState('');
    // eslint-disable-next-line 
    const KitQRCollectionRef = collection (db, "Staff")
  
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
          <h2>Staff List</h2>
          <p>View all the Staff member who created an account with Yong En Care Centre.</p>
          <hr></hr>
        </div>
        
        <form className='input-words'>
         <input type="text" onChange={(event) => {
          setSearch(event.target.value);
          }} 
          className="form-control" 
          id="KitQuantity" 
          placeholder="Enter Member Name" 
          required />
        </form>
      
      
        {/* table infomation */}
        <div className='stafflist-pain'>
        <Row xs={1} md={2} className="g-4">
            {/* display table content */}
               {/* eslint-disable-next-line*/}
            {KitQR.filter((val) => {
                if(search === ""){
                    return val;
                }
                else if(val.Name.toLowerCase().includes(search.toLocaleLowerCase())){
                    return val;
                }
            }).map((user) => {
            return( 
            <Col>
            <Card className='hell'>
              <Card.Img variant="top" src={user.PhotoUrl} className='kitcontent-photo' />
              <Card.Body>
                <Card.Title>{user.Name}</Card.Title>
                <Card.Text>
                {user.Description}
                </Card.Text>
                <Button href={`/Staff/StaffList/Detail/${user.id}`}>view</Button>
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


export default StaffList

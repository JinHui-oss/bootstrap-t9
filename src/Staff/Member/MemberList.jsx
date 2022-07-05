import React, { useState, useEffect } from 'react';
import { Table, Card,Col, Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../Member/Member.css'

// firebase
import { db } from '../../Database/firebase';
import { collection, getDocs } from 'firebase/firestore'

function MemberList() {
    const [KitQR, setKitQR] = useState([]);
    const [search, setSearch] = useState('');
    // eslint-disable-next-line 
    const KitQRCollectionRef = collection (db, "Member")
  
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
      <div className='Member-List'>
        <div className='header'>
          <h2>Member List</h2>
          <p>View all the public member who created an account with Yong En Care Centre.</p>
          <hr></hr>
        </div>
        
        <form className='input-words'>
         <label htmlFor='lable'>Member Name:</label>
         <br />
         <input type="text" onChange={(event) => {
          setSearch(event.target.value);
          }} 
          className="form-control" 
          id="KitQuantity" 
          placeholder="Enter Member Name" 
          required />
        </form>
      
      
        {/* table infomation */}
        <div className='membercontent-table'>
       
        <Row xs={1} md={2} className="m-4a">
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
              <Card>
                <Card.Img variant="top" src={user.PhotoUrl} className='MemberList-photo' />
                <Card.Body>
                  <Card.Title>{user.Name}</Card.Title>
                  <label>ID:</label>
                  <Card.Text>
                    {user.uid}
                  </Card.Text>
                  <Button href={`/Staff/MemberList/Detail/${user.id}`}>view</Button>
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

export default MemberList

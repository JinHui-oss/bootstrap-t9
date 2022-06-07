// react
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// bootstrap
import { Button, Card } from 'react-bootstrap';

// firebase inital setup
import { db } from '../../Database/firebase';

// firebase import function from firestore
import { 
  collection,
  getDoc,
  doc
} from 'firebase/firestore'

import '../Account/Account.css'


function MemberProfile() {
  const [Member,setMember] = useState([]);
  const MemberCollectionRef = collection(db, "Member");
  
  // create variable to reterive the specifc document id
  const { id } = useParams()
 
  useEffect(() => {
    const getdata = async () => {
      //const docRef = doc(db, "Member", "Jz1FaPxDJdE1574728hf");
      const docRef = doc(db, "Member", id);
      const docSnap = await getDoc(docRef);
      
      // check for display output
      // console.log(docSnap);
      
      // check condition
      if (docSnap.exists()) 
      {
        // display the output if the record exist 
        // create a variable to store the data output.
        let data =  docSnap.data();
        // console.log(data)
        
        setMember.state = {
         CreatedAt: data.CreatedAt,
         Email: data.Email,
         Gender: data.Gender,
         Name: data.Name,
         Password: data.Password,
         PhoneNumber: data.PhoneNumber,
         PhotoUrl: data.PhotoUrl,
         Role: data.Role,
         UpdatedAt: data.UpdatedAt,
         uid: data.uid
        }
        
        // reterive the data and stored into a setkit
        setMember(setMember.state)
       
        // check for the display output
        // console.log(setMember.state)
        
      } 
      else 
      {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getdata();

  // eslint-disable-next-line 
  }, [MemberCollectionRef])
 
  return (
    <div className='profilepage-content'>
      
      {/* header of the page */}
      <div className='header'>
        <h2>Profile Page </h2>
        <p>View the document data ensure it is up to date.</p>
        <hr />
      </div>
        
      {/* body content of the kit pictures */}
      <div className='profilepage-pictures'>
        <div className="pic">
          <Card>
            <Card.Body>
              {/* eslint-disable-next-line */}
              <p><img src={Member.PhotoUrl}></img></p>
            </Card.Body>
          </Card>
        </div>
      <br />
      {/* Edit Button */}
      <Button className='profilepage-edit' href ={`/Member/Profile/Edit/${id}`}>
      {/* eslint-disable-next-line */}
      <img src='https://cdn-icons-png.flaticon.com/512/227/227104.png'></img>  
      Edit</Button>
      </div>

       {/* product title and quantity information */} 
       <div className='profilepage-title'>
          <h2>Name: {Member.Name}</h2>
          <hr />
          <h2>Role: {Member.Role}</h2>
          <br />
        </div>

        {/* body content of the kit information */}
        <div className='memberprofilepage-information'>
        <Card className="profilepage-information-title">
            <Card.Title>
                <h3>Account Information</h3>
            </Card.Title>
          </Card>
          <Card className="profilepage-information-body">
            <Card.Body>
              <p>User Id: <br /> {Member.uid}</p>
              <p>Email: <br /> {Member.Email}</p>
              <p>Phone Number: <br /> {Member.PhoneNumber}</p>
              <p>Gender: <br /> {Member.Gender}</p>
              <p>CreatedAt: <br />{Member.CreatedAt}</p> 
            </Card.Body>
          </Card>
        </div>
    </div>
  )
}


export default MemberProfile

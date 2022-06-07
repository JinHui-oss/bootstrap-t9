import React, 
{ 
  useState, 
  useEffect 
} from 'react'

import {
    Button,
    Card
}from 'react-bootstrap'

import 
{ 
  useNavigate,
  useParams 
} from 'react-router-dom';

// firebase inital setup
import { db } from '../../../Database/firebase';

//
import { 
  collection,
  getDoc,
  doc
} from 'firebase/firestore'

import { getAuth } from 'firebase/auth';
import '../Account.css'


function MemberSecurity() {
  const [member, setMember] = useState([]);
  const memberCollectionRef = collection(db, "Member");
  const { id } = useParams()
 
  // create variable to reterive the specifc document id

  const naviagte = useNavigate();

  useEffect(() => {
    const getdata = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if(user !== null){
      
      const id = user.uid;
        
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
          uid : data.uid,
          Name: data.Name,
          PhotoUrl : data.PhotoUrl,
          Email: data.Email,
          Password: data.Password,
          Role: data.Role,
          CreatedAt: data.CreatedAt
        }
        
        // reterive the data and stored into a setkit
        setMember(setMember.state)
       
        // check for the display output
        //console.log(setStaff1.state)
        
      } 
      else 
      {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
  }
    getdata();

  // eslint-disable-next-line 
  }, [memberCollectionRef])

 
  return (
    <div className='setting-content'>
      <div className='setting-content-header'>
        <h1>Security and Account Settings</h1>
        <br />
      </div>
      <div className='setting-content-body'>
        <div className="setting-content-body-1">
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk
            of the card's content.
          </Card.Text>
          <Button variant="primary" href={`/Member/Profile/Security/Edit/${id}`}>Change Password</Button>
        </Card.Body>
      </Card>
    </div>
    <div className="setting-content-body-2">
    <Card >
      <Card.Body>
        <Card.Title>Verify Email</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk
          of the card's content.
        </Card.Text>
        <Button variant="primary">Verify Email</Button>
      </Card.Body>
    </Card>
  </div>
  <div className="setting-content-body-3">
      <Card>
      <Card.Body>
        <Card.Title>2FA</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk
          of the card's content.
        </Card.Text>
        <Button variant="primary">Set up 2FA</Button>
      </Card.Body>
    </Card>
  </div>
  </div>  
  </div>
  )
}

export default MemberSecurity
